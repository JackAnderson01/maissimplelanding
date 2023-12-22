import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
import ScheduledNotificationEntity from "../../schema/notification/ScheduledNotificationSchema";

export default async function GetScheduledNotificationsController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin");

    const scheduledNotifications = await ScheduledNotificationEntity.find(
      {}
    ).sort({ _id: -1 });

    if (scheduledNotifications.length === 0) {
      return res.status(200).json({
        success: false,
        result: scheduledNotifications,
        message: "No results found",
      });
    }

    // Update the status of each ScheduledNotificationEntity record
    const currentTime = new Date();
    for (const notification of scheduledNotifications) {
      const scheduledTime = new Date(
        `${notification.date.toISOString().split("T")[0]}T${notification.time}`
      );

      // Compare scheduled time with current time
      if (scheduledTime > currentTime) {
        notification.status = "scheduled";
      } else {
        notification.status = "delivered";
      }

      // Save the updated notification
      await notification.save();
    }

    return res.status(200).json({
      success: true,
      result: scheduledNotifications,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
}
