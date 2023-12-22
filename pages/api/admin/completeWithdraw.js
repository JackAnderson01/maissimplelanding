import CompleteWithdrawController from "../../../controllers/Admin/CompleteWithdrawController.js";
import connection from "../../../lib/connection.js";

const completeWithdraw = async (req, res) => {
  await connection();
  const method = req.method;
  switch (method) {
    case "POST":
      let result = await CompleteWithdrawController(req, res);
      break;
  }
};

export default completeWithdraw;
