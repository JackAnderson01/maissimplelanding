import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import UserBlockEntity from "../../schema/admin/UserBlockSchema";
import sendNotificationsByEmail from "../Notifications/sendNotificationByEmail";

const validator = Joi.object({
  email: Joi.string().email().required(),
  isBlocked: Joi.bool().required(),
});

export default async function BlockUserController(req, res) {
  const { email, isBlocked } = req.body;

  try {
    await ValidateTokenController(req, res, "admin");

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const blockedUser = await UserBlockEntity.findOne({
      email: email,
    });

    if (blockedUser == null) {
      return res.status(404).json({
        success: false,
        error: "No such user / cleaner found",
      });
    } else {
      if (blockedUser.isBlocked == true && isBlocked == true) {
        return res.status(400).json({
          success: false,
          error: "User already Blocked",
        });
      } else if (blockedUser.isBlocked == false && isBlocked == false) {
        return res.status(400).json({
          success: false,
          error: "User already un-blocked",
        });
      }

      const updatedBlock = await UserBlockEntity.updateOne(
        {
          email: email,
        },
        {
          isBlocked: isBlocked,
        }
      );

      if (isBlocked == true) {
        sendNotificationsByEmail(
          "MaidSimpl",
          "Your profile has been blocked by admin",
          email
        );
      } else {
        sendNotificationsByEmail(
          "MaidSimpl",
          "Your profile has been un-blocked by admin",
          email
        );
      }

      return res.status(200).json({
        success: true,
        result: updatedBlock,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
}
