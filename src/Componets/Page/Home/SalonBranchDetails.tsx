import React from "react";
import { apiResponse, genderModel, paymetModel, salonBranchModel, salonBranchXGenderModel, salonBranchXPaymentModel, salonBranchXServcieModel,  } from "../../../Interfaces";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MiniLoader } from "../Common";
import { toastNotify } from "../../../Helper";
import { RootState } from "../../../Storage/Redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAllGendersQuery } from "../../../Apis/GenderApi"; 
import { useGetAllPaymentsQuery } from "../../../Apis/paymentApi";
import { useGetAllFirstServicesQuery } from "../../../Apis/firstServiceApi";
import { useGetSalonBranchByIdQuery } from "../../../Apis/salonBranchApi";
import { useGetSalonBranchXGenderBySalonBranchIdQuery } from "../../../Apis/salonBranchXGenderApi";
import { useGetSalonBranchXServiceBySalonBranchIdQuery } from "../../../Apis/salonBranchXServiceApi";
import { useGetSalonBranchXPaymentBySalonBranchIdQuery } from "../../../Apis/salonBranchXPaymentApi";



interface Props {
  salonBranch: salonBranchModel;
  salonBranchXPayment: salonBranchXPaymentModel;
  salonBranchXGender: salonBranchXGenderModel;
  salonBranchXService: salonBranchXServcieModel;
  payment: paymetModel;
  gender: genderModel;

}

function truncateText(text: string, maxLength: number): string {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}

function SalonBranchDetails(props: Props) {
  const navigate = useNavigate();
  // const userData: userModel = useSelector(
  //   (state: RootState) => state.userAuthStore
  // );

  return (
    <div className="row">
    <div className="col-lg-6">

      <img src={props.salonBranch.image} alt="Salon Image" style={{ maxWidth: "100%" }} />
    </div>
    <div className="col-lg-6">

      <h2>{props.salonBranch.branchName}</h2>
      <p>Established in {props.salonBranch.yearofEstablishment}</p>
      <p>Description: {props.salonBranch.description}</p>
      <p>Mobile Number: {props.salonBranch.mobileNumber}</p>
      <p>Email: {props.salonBranch.email}</p>
      <p>Open Time: {props.salonBranch.openTime}</p>
      <p>Close Time: {props.salonBranch.closeTime}</p>
      <p>Area: {props.salonBranch.area}</p>

    
      <h3>Gender Details</h3>
      <p>Gender: {props.gender.genderType}</p>
   
      <h3>Payment Details</h3>
      <p>Payment Method: {props.payment.paymentName}</p>
     
    </div>
  </div>
);
}
export default SalonBranchDetails;

