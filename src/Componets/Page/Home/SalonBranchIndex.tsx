import React from "react";
import { apiResponse, salonBranchModel,  } from "../../../Interfaces";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { MiniLoader } from "../Common";
import { toastNotify } from "../../../Helper";
import { RootState } from "../../../Storage/Redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


interface Props {
  salonBranch: salonBranchModel;
}

function truncateText(text: string, maxLength: number): string {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}

function SalonBranchIndex(props: Props) {
  const navigate = useNavigate();
  const { salonBranchId } = useParams();
  // const userData: userModel = useSelector(
  //   (state: RootState) => state.userAuthStore
  // );

  return (
    <div className="row">
    <div className="row-lg-3 row-sm-6">
     
   
      <Link to={`/Detail/${salonBranchId}`} className="text-decoration-none text-black">
        <div className="row p-2"> 
          <div className="col-12 p-1">
            <div className="row">
              <div className="col-md-6">
                <h5 className="fw-bold text-center text-uppercase">
                  {truncateText(props.salonBranch.branchName, 20)}
                </h5>
  
                <a>
                  <img
                    src="https://placehold.co/200x400/png"
                    height="200px"
                    width="400px"
                    className="card-img-top rounded"
                  />
                </a>
              </div>
  
              <div className="col-md-6">
                <div className="card-body p-1">
                  <div className="pl-1 text-start">
                    <span className="fw-bold text-uppercase">Location:-</span>
                    {props.salonBranch.area?.substring(0, Math.min(20, props.salonBranch.area.length))}
                  </div>
  
                  <div className="pl-1 text-start">
                    <span className="fw-bold text-uppercase">YearofEstablishment:-</span>
                    {props.salonBranch.yearofEstablishment}
                  </div>
  
                  <div className="pl-1 text-start">
                    <span className="fw-bold text-uppercase">Email:-</span>
                    {props.salonBranch.email}
                  </div>
  
                  <div className="pl-1 text-start">
                    <span className="fw-bold text-uppercase">Time:-</span>
                    {props.salonBranch.openTime} TO {props.salonBranch.closeTime} 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  </div>
  

    // <div className="col-lg-3 col-sm-6">
    //   <Link to={`/companyDetail/${props.salonBranch.id}`} className="text-decoration-none text-black">
    //     <div className="row p-2"> 
    //       <div className="col-12 p-1">
    //         <h5 className="fw-bold text-center  text-uppercase">
    //           {/* @TruncateText(Company.CompanyName, 20) */}
    //           {/* {props.company.companyName.substring(0,22)} */}
    //           {truncateText(props.salonBranch.branchName, 20)}
    //         </h5>

    //         <a>
    //           {/* @if (Company.CompanyLogo != null && Company.CompanyLogo.Count() > 0)
    //                 {
    //                     <img src="@Company.CompanyLogo" alt="@Company.CompanyName" height="300px" width="400px" className="card-img-top rounded" />
    //                 }
    //                 else
    //                 { */}
    //           <img
    //             src="https://placehold.co/300x400/png"
    //             height="300px"
    //             width="400px"
    //             className="card-img-top rounded"
    //           />
    //           {/* } */}
    //         </a>

    //         <div className="card-body p-1">
    //           <div className="pl-1 text-start">
    //             <span className="fw-bold text-uppercase">Location:-</span>
    //             {/* @Company.Address.Substring(0, Math.Min(20, Company.Address.Length))... */}
    //             {props.salonBranch.area?.substring(0,Math.min(20, props.salonBranch.area.length))}
    //           </div>

    //           <div className="pl-1 text-start">
    //             <span className="fw-bold text-uppercase">YearofEstablishment:-</span>
    //             {props.salonBranch.yearofEstablishment}
    //           </div>

    //           <div className="pl-1 text-start">
    //             <span className="fw-bold text-uppercase">Email:-</span>
    //             {props.salonBranch.email}
    //           </div>

    //           <div className="pl-1 text-start">
    //             <span className="fw-bold text-uppercase">Time:-</span>
    //            {props.salonBranch.openTime} TO  {props.salonBranch.closeTime} 
    //           </div>
    //         </div>

           

    //         {/* @*   <div>
    //         <a asp-action="BrifDetail" asp-controller="Home" asp-area="Customer" asp-route-companyId="@Company.Id" className="btn btn-primary bg-gradient border-0 form-control">
    //         Details
    //         </a>
    //         </div> *@ */}
    //       </div>
    //     </div>
    //   </Link>
    // </div>
  );
}

export default SalonBranchIndex;

