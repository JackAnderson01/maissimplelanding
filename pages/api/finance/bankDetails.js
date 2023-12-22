import PostBankDetailsController from "../../../controllers/Finance/PostBankDetailsController.js";
import connection from "../../../lib/connection.js";

const bankDetails = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await PostBankDetailsController(req, res);
      break;
  }

  return res.status(405).end();
};

export default bankDetails;
