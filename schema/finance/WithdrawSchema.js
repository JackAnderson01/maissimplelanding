import { Schema, model, models } from "mongoose";

const WithdrawSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  bankId: { type: String, required: true },
  date: { type: String, required: true },
  amount: { type: Number, required: true },
  isWithdrawApproved: { type: Boolean, default: false },
  isWithdrawCompleted: { type: Boolean, default: false },
  transactionId: { type: String, required: true },
  withdrawCompletedDate: { type: Date },
  image: {
    type: String,
  },
});

const WithdrawEntity = models.Withdraw || model("Withdraw", WithdrawSchema);
export default WithdrawEntity;
