import Joi from "@hapi/joi";
import { ValidateTokenController } from "../../Authentication/Token/ValidateTokenController";
import RoomEntity from "../../../schema/Price/RoomSchema";

const validListValues = [
  "livingroom",
  "bedroom",
  "bathroom",
  "kitchen",
  "half-bathroom",
];

// Define the updated validator schema
const validator = Joi.object({
  serviceType: Joi.string().valid("base", "deep"),
  rooms: Joi.object().pattern(
    Joi.string()
      .valid(...validListValues)
      .required(),
    Joi.number().positive().required()
  ),
});

export default async function PostRoomNewController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin");

    const { rooms, serviceType } = req.body;

    const { error } = await validator.validateAsync({ rooms });

    if (error) {
      return res
        .status(400)
        .send({ success: false, error: error.details[0].message });
    }

    for (const [roomName, roomPrice] of Object.entries(rooms)) {
      await RoomEntity.updateOne(
        { roomName: roomName, serviceType: serviceType },
        { $set: { price: roomPrice } }
      );
    }

    const updatedRecords = await RoomEntity.find({
      serviceType: serviceType,
    });

    return res.status(200).send({ success: true, result: updatedRecords });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
