import genderModel from "./genderModel";
import salonBranchModel from "./salonBranchModel";

export default interface salonBranchXGenderModel {
    id: number;
    salonBranchId: number;
    salonBranch: salonBranchModel;
    genderId: number;
    gender: genderModel;
  }