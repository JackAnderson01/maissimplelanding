import PostUserController from "../../../controllers/Users/PostUserController.js";
import connection from "../../../lib/connection.js";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

const postUserData = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await PostUserController(req, res);
      break;
  }
};

export default postUserData;
