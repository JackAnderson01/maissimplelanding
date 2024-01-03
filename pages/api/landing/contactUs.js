import ContactUsController from "../../../controllers/landing/ContactUsController.js";
import connection from "../../../lib/connection.js";

const contactUs = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await ContactUsController(req, res);
      break;
  }
};

export default contactUs;
