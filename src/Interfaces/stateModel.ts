import countryModel from "./countryModel";

export default interface   stateModel{
    id: number;
    stateName: string;
    countryId?: number;
    country?: countryModel;
    isActive?: boolean;
  }