import cityModel from "./cityModel";
import countryModel from "./countryModel";
import stateModel from "./stateModel";

export default interface   salonBranchModel{
    id: number;
    branchName: string;
    yearofEstablishment: number;
    image: string;
    description: string; 
    mobileNumber : number; 
    email : string; 
    openTime : string; 
    closeTime : string; 
    address  : string; 
    area  : string; 
    countryId?: number;
    country?: countryModel;
    stateId?: number;
    state?: stateModel;
    cityId?: number;
    city?: cityModel;
    isActive?: boolean;
    isDeleted ?: boolean;
  }