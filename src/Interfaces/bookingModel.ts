import salonBranchModel from "./salonBranchModel";


export default interface bookingModel {
    id: number;
    customerName: string;
    customerMobileNumber: number;
    customerEmail: string;
    bookingDate: Date;
    timming: number;
    salonBranchId?: number;
    salonBranch?: salonBranchModel;
}