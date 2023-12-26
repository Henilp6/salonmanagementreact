import applicationUserModel from "./applicationUserModel";

export default interface loginResponce {
  token?: string
  applicationUser?: applicationUserModel;
}   