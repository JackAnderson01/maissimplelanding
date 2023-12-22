import Joi from "@hapi/joi";
import WithdrawEntity from "../../schema/finance/WithdrawSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import TransactionEntity from "../../schema/finance/TransactionSchema";
import sendNotificationsByEmail from "../Notifications/sendNotificationByEmail";
import sendEmail from "./sendEmail";

const validator = Joi.object({
  withdrawId: Joi.string().min(3).required(),
});

export default async function CompleteWithdrawController(req, res) {
  const { withdrawId } = req.body;

  try {
    await ValidateTokenController(req, res, "admin");

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const withdrawRequest = await WithdrawEntity.findOne({
      _id: withdrawId,
    });

    if (withdrawRequest == null) {
      return res.status(404).json({
        success: false,
        error: "No such withdraw found",
      });
    } else {
      const updatedWithdraw = await WithdrawEntity.updateOne(
        {
          _id: withdrawId,
        },
        {
          isWithdrawCompleted: true,
          withdrawCompletedDate: new Date(),
        }
      );

      await TransactionEntity.updateOne(
        {
          _id: updatedWithdraw.transactionId,
        },
        {
          isComplete: true,
        }
      );

      await sendEmail(
        "Confirmation of Approved MaidSimpl Withdrawal - MaidSimpl",
        `<p>Dear ${withdrawRequest.name},</p>
        <br/>
        <p>We are pleased to inform you that your recent withdrawal request made on ${withdrawRequest.date} for the amount of $${withdrawRequest.amount} to MaidSimpl has been approved.</p>
        <br/>
        <p>Your funds will be processed and transferred according to the chosen payment method. Please allow a reasonable amount of time for the transaction to complete.</p>
        <br/>
        <p>If you have any further questions or need assistance, our support team is available to help. Feel free to reach out at any time.</p>
        <br/>
        <p>Thank you for choosing MaidSimpl. We appreciate your trust and look forward to continuing to serve you.</p>
        <br/>
        <p>Best Regards,<br/>Team MaidSimpl</p>`,
        withdrawRequest.email
      );

      sendNotificationsByEmail(
        "MaidSimpl",
        "Funds deposited to your bank account.",
        withdrawRequest.email
      );

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
