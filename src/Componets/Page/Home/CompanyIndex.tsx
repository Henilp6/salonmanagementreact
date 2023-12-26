import React from "react";
import { apiResponse,  } from "../../../Interfaces";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MiniLoader } from "../Common";
import { toastNotify } from "../../../Helper";
import { RootState } from "../../../Storage/Redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface Props {
 
}

function truncateText(text: string, maxLength: number): string {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}

function CompanyIndex(props: Props) {
  const navigate = useNavigate();
  // const userData: userModel = useSelector(
  //   (state: RootState) => state.userAuthStore
  // );

  return (
    <div className="col-lg-3 col-sm-6">
      <Link to={`/companyDetail/$`} className="text-decoration-none text-black">
        <div className="row p-2"> 
          <div className="col-12 p-1">
            <h5 className="fw-bold text-center  text-uppercase">
              {/* @TruncateText(Company.CompanyName, 20) */}
              {/* {props.company.companyName.substring(0,22)} */}
        
            </h5>

            <a>
              {/* @if (Company.CompanyLogo != null && Company.CompanyLogo.Count() > 0)
                    {
                        <img src="@Company.CompanyLogo" alt="@Company.CompanyName" height="300px" width="400px" className="card-img-top rounded" />
                    }
                    else
                    { */}
              <img
                src="https://placehold.co/300x400/png"
                height="300px"
                width="400px"
                className="card-img-top rounded"
              />
              {/* } */}
            </a>


           

            {/* @*   <div>
            <a asp-action="BrifDetail" asp-controller="Home" asp-area="Customer" asp-route-companyId="@Company.Id" className="btn btn-primary bg-gradient border-0 form-control">
            Details
            </a>
            </div> *@ */}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CompanyIndex;
