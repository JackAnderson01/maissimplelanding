import BookingEntity from "../../schema/booking/BookingSchema";
import PaymentHistoryEntity from "../../schema/finance/PaymentHistorySchema";
import RefundedEntity from "../../schema/finance/RefundedSchema";
import sendNotificationsByEmail from "../Notifications/sendNotificationByEmail";
import { stripe } from "../Stripe/stripe";

export default async function PostRefund(bookingId) {
  const existingRefund = await RefundedEntity.findOne({ bookingId: bookingId });

  if (existingRefund != null) {
    return false; // not created, refund already exists
  } else {
    const existingBooking = await BookingEntity.findOne({
      _id: bookingId,
      areDetailsComplete: true,
    });

    const paymentHistory = await PaymentHistoryEntity.findOne({
      bookingId: bookingId,
    });

    if (paymentHistory != null && paymentHistory.paymentIntentId != null) {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentHistory.paymentIntentId
      );

      if (paymentIntent.status === "succeeded") {
        const date = new Date(paymentIntent.created * 1000);

        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        const formattedDate = date.toLocaleDateString("en-US", options);

        const timeApart = calculateTime(
          existingBooking.date,
          existingBooking.time
        );

        const paymentMethod = await stripe.paymentMethods.retrieve(
          paymentIntent.payment_method
        );

        if (paymentMethod.card != null) {
          const finalRefundAmount =
            timeApart > 48
              ? paymentIntent.amount
              : timeApart > 24
              ? paymentIntent.amount / 2
              : 0;

          const refundRecord = new RefundedEntity({
            bookingId: bookingId,
            isRefunded: false,
            name: existingBooking.name,
            email: existingBooking.userEmail,
            cardDetails: paymentMethod.card.last4,
            paymentDate: formattedDate,
            paymentId: paymentHistory.paymentIntentId,
            refundAmount: finalRefundAmount,
            dateRefunded: null,
          });

          await refundRecord.save();

          sendNotificationsByEmail(
            "MaidSimpl",
            `Refund request sent for \$${finalRefundAmount / 100} from ${
              existingBooking.userEmail
            } on ${formattedDate}`,
            existingBooking.userEmail
          );

          return true; // created successfully
        }
      }
    }
  }

  return false;
}

const calculateTime = (date, time) => {
  const inputDateTime = new Date(`${date} ${time}`);
  const currentDateTime = new Date();
  const timeDifferenceMillis = inputDateTime - currentDateTime;
  return timeDifferenceMillis / (1000 * 60 * 60);
};
