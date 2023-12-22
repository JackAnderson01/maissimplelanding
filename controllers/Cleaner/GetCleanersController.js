import Joi from "@hapi/joi";
import ServiceProviderEntity from "../../schema/service_provider/ServiceProviderSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import UserBlockEntity from "../../schema/admin/UserBlockSchema";

const validator = Joi.object({
  page: Joi.number().allow(null),
});

export default async function GetCleanersController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin");

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res.status(400).send({ Error: error });
    }

    const page = parseInt(req.body.page) || 1; // Page number, default is 1
    const limit = parseInt(req.query.limit) || 15; // Number of items per page, default is 10

    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    const recordsCount = await ServiceProviderEntity.find({}, { _id: 1 });

    const deletedCleaners = await UserBlockEntity.find({ isDeleted: true });
    const deletedCleanerEmails = deletedCleaners.map((user) => user.email);

    const cleanersCount = await ServiceProviderEntity.find(
      {
        email: { $nin: deletedCleanerEmails },
        isSessionComplete: true,
      },
      { _id: 1 }
    );

    const cleaners = await ServiceProviderEntity.find(
      {
        email: { $nin: deletedCleanerEmails },
        isSessionComplete: true,
      },
      { documents: 0 }
    )
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    // Fetch the isBlocked information from UserBlockEntity
    const cleanerBlockInfo = await UserBlockEntity.find({
      email: { $in: cleaners.map((cleaner) => cleaner.email) },
    });

    // Map isBlocked information to cleaner records
    const cleanersWithIsBlocked = cleaners.map((cleaner) => {
      const blockInfo = cleanerBlockInfo.find(
        (info) => info.email === cleaner.email
      );
      return {
        ...cleaner._doc,
        isBlocked: blockInfo ? blockInfo.isBlocked : false,
      };
    });

    if (cleanersWithIsBlocked.length === 0) {
      res.status(404).json({
        success: false,
        result: cleanersWithIsBlocked,
        message: "No results found",
      });
    } else {
      res.status(200).json({
        success: true,
        currentPage: page,
        cleanersCount: cleanersCount.length,
        totalPages: Math.ceil(recordsCount.length / limit),
        result: cleanersWithIsBlocked,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}
