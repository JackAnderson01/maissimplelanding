import WithdrawEntity from "../../schema/finance/WithdrawSchema";
import { ValidateTokenController } from "../Authentication/Token/ValidateTokenController";

export default async function GetAdminWithdrawRequestsController(req, res) {
  try {
    await ValidateTokenController(req, res, "admin");

    const withdrawRequests = await WithdrawEntity.find({
      isWithdrawApproved: false,
      isWithdrawCompleted: false,
    }).sort({ _id: -1 });

    if (withdrawRequests.length == 0) {
      return res.status(200).json({
        success: false,
        result: [],
        error: { message: "No results found" },
      });
    }

    return res.status(200).json({
      success: true,
      result: withdrawRequests,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
}
