import PostRoomNewController from "../../../../controllers/Admin/Rooms/PostRoomNewController.js";
import connection from "../../../../lib/connection.js";

const postRoomPrice = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result1 = await PostRoomNewController(req, res);
      break;
  }
};

export default postRoomPrice;
