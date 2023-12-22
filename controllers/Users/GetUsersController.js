import Joi from "@hapi/joi";
import UserEntity from "../../schema/user/UserSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import UserBlockEntity from "../../schema/admin/UserBlockSchema";

const validator = Joi.object({
  page: Joi.number().allow(null),
});

export default async function GetUsersController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin");

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res.status(400).send({ Error: error });
    }

    const page = parseInt(req.body.page) || 1; // Page number, default is 1
    const limit = parseInt(req.query.limit) || 15; // Number of items per page, default is 10

    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    const recordsCount = await UserEntity.find(
      {
        isSessionComplete: true,
      },
      { _id: 1 }
    );

    const deletedUsers = await UserBlockEntity.find({ isDeleted: true });
    const deletedUserEmails = deletedUsers.map((user) => user.email);

    const usersCount = await UserEntity.find(
      {
        email: { $nin: deletedUserEmails },
        isSessionComplete: true,
      },
      { _id: 1 }
    );

    const users = await UserEntity.find(
      {
        email: { $nin: deletedUserEmails },
        isSessionComplete: true,
      },
      { image: 0 }
    )
      .sort({ _id: -1 }) // Sort in descending order based on createdAt field
      .skip(skip)
      .limit(limit);

    // Fetch the isBlocked information from UserBlockEntity
    const userBlockInfo = await UserBlockEntity.find({
      email: { $in: users.map((user) => user.email) },
    });

    // Map isBlocked information to user records
    const usersWithIsBlocked = users.map((user) => {
      const blockInfo = userBlockInfo.find((info) => info.email === user.email);
      return {
        ...user._doc,
        isBlocked: blockInfo ? blockInfo.isBlocked : false,
      };
    });

    if (usersWithIsBlocked.length === 0) {
      res.status(200).json({
        success: false,
        result: usersWithIsBlocked,
        message: "No results found",
      });
    } else {
      res.status(200).json({
        success: true,
        usersCount: usersCount.length,
        currentPage: page,
        totalPages: Math.ceil(recordsCount.length / limit),
        result: usersWithIsBlocked,
      });
    }
  } catch (err) {
    res.status(422).json({
      success: false,
      error: err.message,
    });
  }
}
