import PostExtraNewController from "../../../../controllers/Admin/Extras/PostExtraNewController.js";
import connection from "../../../../lib/connection.js";

const postExtrasPrice = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result1 = await PostExtraNewController(req, res);
      break;
  }
};

export default postExtrasPrice;
