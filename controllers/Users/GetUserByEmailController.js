import UserEntity from "../../schema/user/UserSchema";
import Joi from "@hapi/joi";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";
// import WithdrawEntity from "../../schema/finance/WithdrawSchema";
// import AdminSignUpEntity from "../../schema/admin/AdminSignUpSchema";
// import RefundedEntity from "../../schema/finance/RefundedSchema";
// import scheduleBooking from "../Booking/SubscriptionSchedulerController";
// import SubscriptionEntity from "../../schema/booking/SubscriptionSchema";
// import BookingEntity from "../../schema/booking/BookingSchema";
// import { stripe } from "../Stripe/stripe";
// import SubscriptionEntity from "../../schema/booking/SubscriptionSchema";
// import BookingEntity from "../../schema/booking/BookingSchema";
// import WithdrawEntity from "../../schema/finance/WithdrawSchema";
// import ServiceProviderEntity from "../../schema/service_provider/ServiceProviderSchema";
// import scheduleBooking from "../Booking/SubscriptionSchedulerController";
// import AdminSignUpEntity from "../../schema/admin/AdminSignUpSchema";
// import AdminEntity from "../../schema/admin/AdminSchema";
// import OTPEntity from "../../schema/auth/OTPSchema";
// import BookingEntity from "../../schema/booking/BookingSchema";
// import BookingEntity from "../../schema/booking/BookingSchema";
// import FireUserEntity from "../../schema/firebase/FireUserSchema";
// import LocationEntity from "../../schema/booking/LocationSchema";
// import { stripe } from "../Stripe/stripe";
// import DeleteUID from "../Firebase/DeleteUID";
// import UserSignUpEntity from "../../schema/user/UserSignUpSchema";
// import AvailabilityEntity from "../../schema/service_provider/AvailabilitySchema";
// import ServiceProviderEntity from "../../schema/service_provider/ServiceProviderSchema";
// import ServiceProviderRequestEntity from "../../schema/service_provider/ServiceProviderRequestSchema";
// import ServiceProviderSignUpEntity from "../../schema/service_provider/ServiceProviderSignupSchema";
// import NotificationContentEntity from "../../schema/notification/NotificationContentSchema";
// import ScheduledNotificationEntity from "../../schema/notification/ScheduledNotificationSchema";
// import NotificationEntity from "../../schema/notification/NotificationSchema";
// import FireUserEntity from "../../schema/firebase/FireUserSchema";
// import WithdrawEntity from "../../schema/finance/WithdrawSchema";
// import WalletEntity from "../../schema/finance/WalletSchema";
// import TransactionEntity from "../../schema/finance/TransactionSchema";
// import StripeCustomerEntity from "../../schema/finance/StripeCustomer";
// import RefundedEntity from "../../schema/finance/RefundedSchema";
// import PaymentHistoryEntity from "../../schema/finance/PaymentHistorySchema";
// import PaymentCardEntity from "../../schema/finance/PaymentCardSchema";
// import BankDetailsEntity from "../../schema/finance/BankDetailsSchema";
// import VoucherEntity from "../../schema/feedback_rewards/VoucherSchema";
// import ReferCodeEntity from "../../schema/feedback_rewards/ReferCodeSchema";
// import RatingEntity from "../../schema/feedback_rewards/RatingsSchema";
// import SubscriptionEntity from "../../schema/booking/SubscriptionSchema";
// import RoomBookingEntity from "../../schema/booking/RoomBookingSchema";
// import LocationEntity from "../../schema/booking/LocationSchema";
// import BookingEntity from "../../schema/booking/BookingSchema";
// import OTPEntity from "../../schema/auth/OTPSchema";
// import UserBlockEntity from "../../schema/admin/UserBlockSchema";
// import AdminSignUpEntity from "../../schema/admin/AdminSignUpSchema";
// import AdminEntity from "../../schema/admin/AdminSchema";
// import LoginEntity from "../../schema/auth/LoginSchema";
// import PostRefund from "../Refund/PostRefund";

const emailValidator = Joi.object({
  email: Joi.string().email().required(),
});

export default async function GetUserByEmailController(req, res) {
  const { email } = req.body;

  // const updatedWithdraw = await WithdrawEntity.updateMany(
  //   {
  //     isWithdrawCompleted: false,
  //   },
  //   {
  //     withdrawCompletedDate: null,
  //   }
  // );

  // await AdminSignUpEntity.deleteOne({ email: "dignite.studios.dev@gmail.com" });

  // await RefundedEntity.updateMany({}, { dateRefunded: null });
  // await RefundedEntity.updateMany(
  //   { isRefunded: true },
  //   { dateRefunded: new Date() }
  // );

  // await WithdrawEntity.updateMany(
  //   { isWithdrawApproved: null },
  //   { isWithdrawApproved: false }
  // );

  // const twoDaysAgo = new Date();
  // twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  // Assuming SubscriptionEntity is your Mongoose model
  // await BookingEntity.deleteMany({
  //   userEmail: "nayiro9632@gyxmz.com",
  // });
  // await SubscriptionEntity.deleteMany({ lastRun: { $lt: twoDaysAgo } });

  //TODO check after list of modules, stripe invoices
  // const payments = await stripe.invoices.list({
  //   subscription: "sub_1OM8PuLRnhmwxG56xtzXAUxA",
  // });

  // console.log(payments);

  // await UserEntity.updateMany({}, { ordersCompleted: 0 });
  // await ServiceProviderEntity.updateMany({}, { jobsCompleted: 0 });

  // const subs = await SubscriptionEntity.find({});

  // subs.forEach(async (sub) => {
  //   const bookie = await BookingEntity.findOne({ _id: sub.bookingId });
  //   if (bookie == null) {
  //     await SubscriptionEntity.deleteOne({ bookingId: sub.bookingId });
  //   }
  // });

  // await BookingEntity.deleteMany({ date: null, time: null });

  // await scheduleBooking("vihikek221@nasmis.com", 7, "657805c4693d8c381e59f30b");

  // await OTPEntity.updateMany({}, { hasExpired: true });
  // await AdminEntity.updateMany({}, { lastName: "" });

  // await UserEntity.updateMany({}, { isSessionComplete: true });
  // await ServiceProviderEntity.updateMany({}, { isSessionComplete: true });

  // await TransactionEntity.updateMany(
  //   {},
  //   {
  //     isComplete: true,
  //   }
  // );

  // await BookingEntity.deleteMany({ userEmail: "vihikek221@nasmis.com" });
  // await SubscriptionEntity.deleteMany({ email: "vihikek221@nasmis.com" });

  // const fireUsers = await FireUserEntity.find({});

  // console.log(fireUsers);
  // return res.status(200).send({ result: fireUsers });

  // await BookingEntity.deleteMany({
  //   serviceProviderEmail: "jocox15404@dpsols.com",
  // });

  // await LocationEntity.updateMany({}, { postal: "" });

  // const paymentIntent = await stripe.paymentIntents.retrieve(
  //   "pi_3OJtiJLRnhmwxG560FhEIE7a"
  // );

  // console.log(paymentIntent);

  // const paymentMethod = await stripe.paymentMethods.retrieve(
  //   "pm_1OJdXdLRnhmwxG56XQYs4XGC"
  // );

  // console.log(paymentMethod.card.last4);

  // const subscription = await stripe.subscriptions.retrieve(
  //   "sub_1OJdXILRnhmwxG56ltpXDjrV"
  // );

  // console.log(subscription.default_payment_method);

  // const paymentMethod = await stripe.paymentMethods.retrieve(
  //   subscription.default_payment_method
  // );

  // console.log(paymentMethod.card != null);
  // console.log(paymentMethod.card.last4);

  // await DeleteUID(
  //   "hphqxNEmi6b6ulIhk55TUSnEwgJ2",
  //   "AsrhIzHhi7SuGVtBCTVBa2xN1B02",
  //   "users"
  // );

  // await PostRefund("6567b7b006bb28261b866564");

  // await UserSignUpEntity.updateMany({}, { joinedAt: "11/29/2023" });
  // await ServiceProviderSignUpEntity.updateMany({}, { joinedAt: "11/29/2023" });

  // const currentDate = new Date();
  // const formattedDate = currentDate.toLocaleDateString("en-US", {
  //   format: "MM/DD/YYYY",
  // });

  // await UserSignUpEntity.updateMany({}, { joinedAt: formattedDate });
  // await ServiceProviderSignUpEntity.updateMany({}, { joinedAt: formattedDate });

  // await UserEntity.deleteMany({});
  // await UserSignUpEntity.deleteMany({});
  // await AvailabilityEntity.deleteMany({});
  // await ServiceProviderEntity.deleteMany({});
  // await ServiceProviderRequestEntity.deleteMany({});
  // await ServiceProviderSignUpEntity.deleteMany({});
  // await NotificationContentEntity.deleteMany({});
  // await ScheduledNotificationEntity.deleteMany({});
  // await NotificationEntity.deleteMany({});
  // await FireUserEntity.deleteMany({});
  // await WithdrawEntity.deleteMany({});
  // await WalletEntity.deleteMany({});
  // await TransactionEntity.deleteMany({});
  // await StripeCustomerEntity.deleteMany({});
  // await RefundedEntity.deleteMany({});
  // await PaymentHistoryEntity.deleteMany({});
  // await PaymentCardEntity.deleteMany({});
  // await BankDetailsEntity.deleteMany({});
  // await VoucherEntity.deleteMany({});
  // await ReferCodeEntity.deleteMany({});
  // await RatingEntity.deleteMany({});
  // await SubscriptionEntity.deleteMany({});
  // await RoomBookingEntity.deleteMany({});
  // await LocationEntity.deleteMany({});
  // await BookingEntity.deleteMany({});
  // await OTPEntity.deleteMany({});
  // await LoginEntity.deleteMany({});
  // await UserBlockEntity.deleteMany({});
  // await AdminSignUpEntity.deleteMany({});
  // await AdminEntity.deleteMany({});

  try {
    await ValidateTokenController(req, res, "user");

    const { error } = await emailValidator.validateAsync(req.body);

    if (error) {
      res.status(400).send({ Error: error.details[0].message });
    } else {
      const userRecord = await UserEntity.findOne({ email: email });

      if (userRecord == null) {
        return res.status(404).json({
          success: false,
          error: { message: "User not found" },
        });
      }

      res.status(200).json({
        success: true,
        result: userRecord,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}
