import ServiceProviderSignUpEntity from "../../schema/service_provider/ServiceProviderSignupSchema";
import UserSignUpEntity from "../../schema/user/UserSignUpSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";

const abbreviatedMonthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default async function GetSignUpCountsController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin");

    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const users = await UserSignUpEntity.aggregate([
      {
        $match: {
          joinedAt: { $gte: twelveMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%m", date: "$joinedAt" },
          },
          users: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          users: "$users",
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);

    const cleaners = await ServiceProviderSignUpEntity.aggregate([
      {
        $match: {
          joinedAt: { $gte: twelveMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%m", date: "$joinedAt" },
          },
          cleaners: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          cleaners: "$cleaners",
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);

    const combinedData = [];
    for (const cleaner of cleaners) {
      const matchingUser = users.find((user) => user.date === cleaner.date);
      const data = {
        date: abbreviatedMonthNames[parseInt(cleaner.date) - 1], // Convert month number to abbreviated name
        cleaners: cleaner.cleaners,
        users: matchingUser ? matchingUser.users : 0,
      };
      combinedData.push(data);
    }

    users.forEach((user) => {
      if (
        !combinedData.some(
          (data) => data.date === abbreviatedMonthNames[parseInt(user.date) - 1]
        )
      ) {
        combinedData.push({
          date: abbreviatedMonthNames[parseInt(user.date) - 1], // Convert month number to abbreviated name
          cleaners: 0,
          users: user.users,
        });
      }
    });

    combinedData.sort((a, b) => a.date.localeCompare(b.date)); // Sort by abbreviated month name

    return res.status(200).json({
      success: true,
      result: combinedData,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
}
