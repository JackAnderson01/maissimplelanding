import Joi from "@hapi/joi";
import { ValidateTokenController } from "../../Authentication/Token/ValidateTokenController";
import ExtraEntity from "../../../schema/Price/ExtraSchema";

const validListValues = [
  "oven",
  "windows",
  "fridge",
  "cabinets",
  "organizing",
  "dishwasher",
  "garage",
  "blinds",
  "microwave",
];

// Define the validator schema
const validator = Joi.object({
  extras: Joi.object().pattern(
    Joi.string()
      .valid(...validListValues)
      .required(),
    Joi.number().positive().required()
  ),
});

export default async function PostExtraNewController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin");

    const { extras } = req.body;

    const { error } = await validator.validateAsync({ extras });

    if (error) {
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });
    }

    for (const [serviceName, price] of Object.entries(extras)) {
      await ExtraEntity.updateOne(
        { serviceName },
        { $set: { price } },
        { upsert: true }
      );
    }

    const updatedRecords = await ExtraEntity.find({});

    return res.status(200).send({ success: true, result: updatedRecords });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
