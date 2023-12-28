import BookingEntity from "../../schema/booking/BookingSchema";
import SubscriptionEntity from "../../schema/booking/SubscriptionSchema";
import moment from "moment";
import createBookingPrice from "./createBookingPrice";
import PaymentHistoryEntity from "../../schema/finance/PaymentHistorySchema";
import { stripe } from "../Stripe/stripe";
import sendNotificationsByEmail from "../Notifications/sendNotificationByEmail";

export default async function scheduleBooking(email, interval, bookingId) {
  const currentDate = new Date();

  // Extract day, month, and year components from the current date
  const day = currentDate.getDate().toString().padStart(2, "0"); // Ensure it's zero-padded (e.g., '05' instead of '5')
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so add 1
  const year = currentDate.getFullYear();
  // Create the formatted date string
  const formattedDate = `${day}-${month}-${year}`;

  const bookingRecord = await BookingEntity.findOne({ _id: bookingId });

  const existingSub = await SubscriptionEntity.findOne({
    bookingId: bookingId,
  });
  if (existingSub != null) {
    console.log("sub creation returned");
    return;
  }

  const subscriptionRecord = new SubscriptionEntity({
    email,
    interval,
    bookingId,
    currentPrice: bookingRecord.price,
    totalAmountSpent: bookingRecord.price,
    jobsCompleted: 1,
    extras: bookingRecord.extras,
    SubscriptionDate: formattedDate,
    lastRun: new Date(),
    nextRun: new Date(currentDate.getTime() + interval * 24 * 60 * 60 * 1000),
    isActive: false,
  });

  await subscriptionRecord.save();
}

async function runScheduledEmails() {
  const allSubscriptions = await SubscriptionEntity.find({
    isActive: true,
    nextRun: { $lte: new Date() },
  });

  for (const subscription of allSubscriptions) {
    if (subscription.nextRun <= new Date()) {
      const bookingExists = await BookingEntity.findById(
        subscription.bookingId
      );

      const newDate = addDays(bookingExists);
      const newPrice = await createBookingPrice(
        bookingExists._id,
        bookingExists.servicetype,
        bookingExists.rooms,
        bookingExists.extras,
        bookingExists.howoften,
        null
      );

      const paymentHistoryRecord = await PaymentHistoryEntity.findOne({
        bookingId: subscription.bookingId,
      });

      const invoiceList = await stripe.invoices.list({
        subscription: paymentHistoryRecord.subscriptionId,
      });

      var isPaymentCleared = false;

      if (invoiceList != null && invoiceList.data != null) {
        const lastIndex = invoiceList.data.length - 1;
        const invoice = invoiceList.data[lastIndex];

        const createdDate = moment
          .unix(invoice.created)
          .utc()
          .format("MM/DD/YYYY");

        isPaymentCleared =
          (moment(createdDate, "MM/DD/YYYY").isSameOrAfter(
            moment(newDate, "MM/DD/YYYY").subtract(1, "days")
          ) ||
            moment(createdDate, "MM/DD/YYYY").isSameOrBefore(
              moment(newDate, "MM/DD/YYYY").add(1, "days")
            )) &&
          invoice.paid === true;
      }

      if (isPaymentCleared == false) {
        sendNotificationsByEmail(
          "MaidSimpl",
          `Payment failed for booking on ${bookingExists.date} ${bookingExists.time} from recurring booking`,
          bookingExists.userEmail
        );
      } else {
        const newBooking = new BookingEntity({
          servicetype: bookingExists.servicetype,
          rooms: bookingExists.rooms,
          extras: subscription.extras,
          date: newDate,
          time: bookingExists.time,
          howoften: bookingExists.howoften,
          name: bookingExists.name,
          preferredName: bookingExists.preferredName,
          userEmail: bookingExists.userEmail,
          serviceProviderEmail: bookingExists.serviceProviderEmail,
          contact: bookingExists.contact,
          country: bookingExists.country,
          state: bookingExists.state,
          city: bookingExists.city,
          zipcode: bookingExists.zipcode,
          comments: bookingExists.comments,
          progress: "confirmed",
          status: "booking-confirmed",
          serviceProvidersArray: bookingExists.serviceProvidersArray,
          price: newPrice,
          location: bookingExists.location,
          latitude: bookingExists.latitude,
          longitude: bookingExists.longitude,
          areDetailsComplete: bookingExists.areDetailsComplete,
          isPaymentDone: bookingExists.isPaymentDone,
        });

        await newBooking.save();

        subscription.jobsCompleted += 1;
        subscription.totalAmountSpent += subscription.currentPrice;

        subscription.nextRun =
          new Date() + subscription.interval * 1000 * 60 * 60 * 24;

        await subscription.save();

        try {
          if (bookingExists.serviceProviderEmail != null) {
            sendNotificationsByEmail(
              "MaidSimpl",
              `Booking for ${bookingExists.date} ${bookingExists.time} created from recurring booking`,
              bookingExists.serviceProviderEmail
            );
          }
          sendNotificationsByEmail(
            "MaidSimpl",
            `Automated Booking created from subscription for ${bookingExists.date} ${bookingExists.time}`,
            bookingExists.userEmail
          );
        } catch (err) {
          console.log(
            `Not able to send notification for automated booking for ${bookingExists.userEmail}`
          );
        }
      }
    }
  }
}

// setInterval(runScheduledEmails, 1000 * 60); // Run the scheduler every minute

function addDays(bookingExists) {
  const originalDate = moment(bookingExists.date, "MM/DD/YYYY");

  let daysToAdd = 7; // Default to weekly
  if (bookingExists.howoften === "biweekly") {
    daysToAdd = 14;
  } else if (bookingExists.howoften === "monthly") {
    daysToAdd = 30;
  }

  const newDate = originalDate.add(daysToAdd, "days");

  const formattedNewDate = newDate.format("MM/DD/YYYY");

  return formattedNewDate;
}

// const calculatePrice = (servicetype, rooms, extras, howoften) => {
//   let price = 0;
//   if (servicetype != null) {
//     price += servicetype === "base" ? 140 : 160;
//   }

//   if (rooms != null) {
//     for (const room of rooms) {
//       if (room.roomName === "bedroom") {
//         price += 20 * (room.quantity - 1);
//       } else if (room.roomName === "livingroom") {
//         price += 25 * (room.quantity - 1);
//       } else if (room.roomName === "kitchen") {
//         price += 50 * (room.quantity - 1);
//       } else if (room.roomName === "bathroom") {
//         price += 30 * (room.quantity - 1);
//       } else if (room.roomName === "half-bathroom") {
//         time += 15 * (room.quantity - 1);
//       }
//     }
//   }

//   if (extras != null) {
//     for (const extra of extras) {
//       if (
//         extra === "oven" ||
//         extra === "windows" ||
//         extra === "cabinets" ||
//         extra === "garage"
//       ) {
//         price += 30;
//       } else if (extra === "organizing") {
//         price += 50;
//       } else if (extra === "dishwasher") {
//         price += 26;
//       } else if (extra === "microwave") {
//         price += 12;
//       } else if (extra === "blinds") {
//         price += 35;
//       } else if (extra === "fridge") {
//         price += 40;
//       }
//     }
//   }

//   if (howoften != null) {
//     if (howoften === "weekly") {
//       price = price * 0.85; //15% off
//     } else if (howoften === "biweekly") {
//       price = price * 0.9; //10% off
//     } else if (howoften === "monthly") {
//       price = price * 0.95; //5% off
//     }
//   }

//   // if (voucher != null) {
//   //   if (voucher.discountPrice != 0) {
//   //     price = bookingExists.price - voucher.discountPrice;
//   //   } else {
//   //     price =
//   //       bookingExists.price - bookingExists.price * voucher.discountPercent;
//   //   }
//   // }

//   return price;
// };
