import paymentModel from "./paymentModel";
import salonBranchModel from "./salonBranchModel";

export default interface salonBranchXPaymentModel {
    id: number;
    salonBranchId: number;
    salonBranch: salonBranchModel;
    paymentId: number;
    payment: paymentModel;
  }