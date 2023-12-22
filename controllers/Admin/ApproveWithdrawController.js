import Joi from "@hapi/joi";
import WithdrawEntity from "../../schema/finance/WithdrawSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import sendNotificationsByEmail from "../Notifications/sendNotificationByEmail";
import sendEmail from "./sendEmail";
import WalletEntity from "../../schema/finance/WalletSchema";
import TransactionEntity from "../../schema/finance/TransactionSchema";

const validator = Joi.object({
  id: Joi.string().min(3).required(),
  isApproved: Joi.bool().required(),
});

export default async function ApproveWithdrawController(req, res) {
  const { id, isApproved } = req.body;

  try {
    await ValidateTokenController(req, res, "admin");

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const withdrawRequest = await WithdrawEntity.findOne({
      _id: id,
    });

    if (withdrawRequest == null) {
      return res.status(404).json({
        success: false,
        error: "No such withdraw found",
      });
    } else {
      const updatedWithdraw = await WithdrawEntity.updateOne(
        {
          _id: id,
        },
        {
          isWithdrawApproved: isApproved,
        }
      );

      if (isApproved == false) {
        await WalletEntity.updateOne(
          { email: withdrawRequest.email },
          { $inc: { balance: withdrawRequest.amount } }
        );
        await TransactionEntity.updateOne(
          { _id: withdrawRequest.transactionId },
          { type: "declined", isComplete: true }
        );

        await sendEmail(
          "Notification Regarding Your MaidSimpl Withdrawal Request - MaidSimpl",
          `<p>Dear ${withdrawRequest.name},</p>
          <br/>
          <p>We sincerely regret to inform you that your withdrawal request made on ${withdrawRequest.date} for the amount of $${withdrawRequest.amount} to MaidSimpl has unfortunately been declined.</p>
          <br/>
          <p>If you have any concerns or questions regarding this decision, we kindly ask you to reach out to our dedicated support team. They will be more than happy to assist you and provide further clarification.</p>
          <br/>
          <p>We understand the importance of your request, and we appreciate your understanding in this matter. Thank you for your continued support and cooperation.</p>
          <br/>
          <p>Best Regards,<br/>Team MaidSimpl</p>`,
          withdrawRequest.email
        );

        sendNotificationsByEmail(
          "MaidSimpl",
          "Withdraw Request declined by admin",
          withdrawRequest.email
        );
      } else {
        sendNotificationsByEmail(
          "MaidSimpl",
          "Withdraw Request has been approved by admin",
          withdrawRequest.email
        );
      }

      return res.status(200).json({
        success: true,
        result: updatedWithdraw,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
}
