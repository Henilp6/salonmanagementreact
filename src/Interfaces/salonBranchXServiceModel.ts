import firstServiceModel from "./firstServiceModel";
import service from "./firstServiceModel";
import salonBranchModel from "./salonBranchModel";

export default interface salonBranchXServcieModel {
    id: number;
    salonBranchId: number;
    salonBranch: salonBranchModel;
    serviceId: number;
    service: firstServiceModel;
  }