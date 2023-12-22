import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import ServiceProviderEntity from "../../schema/service_provider/ServiceProviderSchema";
import sendEmail from "./sendEmail";
import sendNotificationsByEmail from "../Notifications/sendNotificationByEmail";
import ServiceProviderSignUpEntity from "../../schema/service_provider/ServiceProviderSignupSchema";
import FireUserEntity from "../../schema/firebase/FireUserSchema";
import OTPEntity from "../../schema/auth/OTPSchema";
import NotificationContentEntity from "../../schema/notification/NotificationContentSchema";
import DeleteProfile from "../Firebase/DeleteProfile";

const adminValidator = Joi.object({
  serviceProviderEmail: Joi.string().email().required(),
  isApproved: Joi.boolean().required(),
  declineReason: Joi.string(),
});

export default async function ApproveServiceProviderController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin");

    const { serviceProviderEmail, isApproved, declineReason } = req.body;
    const { error } = adminValidator.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const existingServiceProvider = await ServiceProviderEntity.findOne({
      email: serviceProviderEmail,
    });

    if (existingServiceProvider) {
      const updatedServiceProvider =
        await ServiceProviderEntity.findOneAndUpdate(
          { email: serviceProviderEmail },
          {
            isApproved: isApproved,
          },
          { new: true }
        );

      if (!updatedServiceProvider) {
        return res
          .status(404)
          .json({ success: false, error: "Service Provider not found" });
      }

      if (isApproved == false && declineReason != null) {
        await deleteCleaner(serviceProviderEmail);

        await sendEmail(
          "Update on your MaidSimpl Profile - MaidSimpl",
          `<p>Dear ${existingServiceProvider.preferredName},</p>
          <br/>
          <p>We regret to inform you that your profile submission to MaidSimpl has been declined.</p>
          <p>After careful consideration, we have determined that your profile does not meet our current requirements.</p>
          <br/>
          <p>Please re-signUp in order to be considered for another request. Please be sure to make these necessary updates before resubmitting.</p>
          <br/>
          <p>Reason of decline:</p>
          <p>${declineReason}</p>
          <br/>
          <p>If you have any questions or concerns, feel free to reach out to our support team.</p>
          <br/>
          <p>Best regards,<br>Team MaidSimpl</p>`,
          existingServiceProvider.email
        );
      } else if (isApproved == false) {
        await deleteCleaner(serviceProviderEmail);

        await sendEmail(
          "Update on your MaidSimpl Profile - MaidSimpl",
          `<p>Dear ${existingServiceProvider.preferredName},</p>
          <br/>
          <p>We regret to inform you that your profile submission to MaidSimpl has been declined.</p>
          <p>After careful consideration, we have determined that your profile does not meet our current requirements.</p>
          <br/>
          <p>Please re-signUp in order to be considered for another request. Please be sure to make any necessary updates before resubmitting.</p>
          
          <br/>
          <p>If you have any questions or concerns, feel free to reach out to our support team.</p>
          <br/>
          <p>Best regards,<br>Team MaidSimpl</p>`,
          existingServiceProvider.email
        );
      } else {
        const isSent = await sendEmail(
          "Congratulations on Your Approved MaidSimpl Profile! - MaidSimpl",
          `<p>Dear ${existingServiceProvider.preferredName},</p>
          <br/>
          <p>We are thrilled to inform you that your profile has been successfully approved by MaidSimpl. Congratulations on this achievement! We look forward to the valuable contributions you'll bring to our community.</p>
          <br/>
          Click <a href="http://portal.maidsimpl.com/login">here</a> to login to profile.
          <br/>
          <br/>
          <p>Best regards,<br>Team MaidSimpl</p>`,
          existingServiceProvider.email
        );

        // if (isSent) {

        sendNotificationsByEmail(
          "MaidSimpl",
          "Congrats -  Your profile has been approved!",
          existingServiceProvider.email
        );
      }

      return res
        .status(200)
        .json({ success: true, result: updatedServiceProvider });
      // } else {
      //   return res.status(200).json({
      //     success: true,
      //     result: updatedServiceProvider,
      //     error: "Email not sent, but cleaner approved",
      //   });
      // }
    } else {
      return res
        .status(400)
        .json({ success: false, error: "Service Provider not updated" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

async function deleteCleaner(email) {
  const deletionResult = await ServiceProviderEntity.deleteOne({
    email: email,
  });

  const deletionResult2 = await ServiceProviderSignUpEntity.deleteOne({
    email: email,
  });

  const fireUser = await FireUserEntity.findOne({ email: email });
  const deletionResult3 = await FireUserEntity.deleteOne({ email: email });
  const deletionResult5 = await OTPEntity.deleteMany({ email: email });
  const deleteNotification = await NotificationContentEntity.deleteMany({
    email: email,
  });
  var deletionResult4 = null;
  if (fireUser != null) {
    deletionResult4 = await DeleteProfile(fireUser.uid, "cleaners");
  }
}
