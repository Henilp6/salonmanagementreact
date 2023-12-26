import countryModel from "./countryModel"
import stateModel from "./stateModel"

export default interface cityModel {
    id: number;
  cityName: string;
  countryId?: number;
  country?: countryModel;
  stateId?: number;
  state?: stateModel;
  isActive?: boolean;
}