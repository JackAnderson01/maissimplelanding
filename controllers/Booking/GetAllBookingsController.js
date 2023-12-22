import Joi from "@hapi/joi";
import BookingEntity from "../../schema/booking/BookingSchema.js";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController.js";

const validator = Joi.object({
  page: Joi.number().allow(null),
});

export default async function GetAllBookingsController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin");

    const { page } = req.body;

    const { error } = await validator.validateAsync(req.body);

    if (error) {
      return res.status(400).send({ Error: error });
    }

    // const page = parseInt(req.query.page) || 1; // Page number, default is 1
    const limit = parseInt(req.query.limit) || 500; // Number of items per page, default is 10

    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    const totalRecords = await BookingEntity.countDocuments({
      areDetailsComplete: true,
      isPaymentDone: true,
    });

    const bookings = await BookingEntity.find(
      { areDetailsComplete: true, isPaymentDone: true },
      { areDetailsComplete: 0, isPaymentDone: 0 }
    )
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalRecords / limit),
      result: bookings,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}
