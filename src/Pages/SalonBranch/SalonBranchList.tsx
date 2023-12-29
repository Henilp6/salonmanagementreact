import React, { useEffect, useState } from "react";
import {
  useDeleteSalonBranchMutation,
  useGetSalonBranchsQuery,
} from "../../Apis/salonBranchApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Componets/Page/Common";
import { useNavigate } from "react-router-dom";

import { debounce } from "lodash";
import salonBranchModel from "../../Interfaces/salonBranchModel";

function SalonBranchList() {
  const [deleteSalonBranch] = useDeleteSalonBranchMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { data, isLoading, isError, refetch } = useGetSalonBranchsQuery({
    search: searchQuery,
    pageSize: pageSize,
    pageNumber: pageNumber,
  });
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const receivedRoles = ["Customer", "Admin", "Data Operator"]; 
  const [userRole, setUserRole] = useState(receivedRoles);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setLoggedIn(true);
      const decodedToken = parseJwt(token);
      setUserName(decodedToken.unique_name);
      setUserRole(decodedToken.role || []);
    } else {
      setLoggedIn(false);
      setUserName("");
      setUserRole([]);
    }
  }, []);

  const parseJwt = (token: any) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  useEffect(() => {
    
    if (!userRole.includes("Admin")) {
     
      navigate("/accessDenied"); 
    }
  }, [userRole, navigate]);

  const debouncedSearch = debounce(() => refetch(), 300);

  const handleSalonBranchDelete = async (id: number) => {
    toast.promise(
      deleteSalonBranch(id),
      {
        pending: "Processing your request...",
        success: "SalonBranch Deleted Successfully 👌",
        error: "Error encoutnered 🤯",
      },
      {
        theme: "dark",
      }
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
    setPageNumber(1);
    debouncedSearch();
  };

  if (!userRole.includes("Admin")) {
    return null;
  }

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && !isError && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-success">SalonBranch List</h1>

            <button
              className="btn btn-success"
              onClick={() => navigate("/salonBranch/salonBranchupsert")}
            >
              Add New SalonBranch
            </button>
          </div>
          <div className="row border p-2">
            <div className="col-8">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="col-4 d-flex justify-content-end">
              <button className="btn btn-success" onClick={debouncedSearch}>
                Search
              </button>
            </div>
          </div>
          <br />

          <div className="">
            <div className="row border">
              <div className="col-1">BranchName</div>
              <div className="col-2">Area</div>
              <div className="col-2">BranchXPayment</div>
              <div className="col-2">BranchXGender</div>
              <div className="col-2">BranchXService</div>
           
              <div className="col-3">Action</div>
            </div>

            {data.result.map((salonBranch: salonBranchModel) => (
              <div className="row border" key={salonBranch.id}>
                <div className="col-1">{salonBranch.branchName}</div>
                <div className="col-2">{salonBranch.area}</div>
                <div className="col-2">
                    <button
                      className="btn btn-success"
                      onClick={() => navigate("/salonBranchXPayment/salonBranchXPaymentUpsert/" + salonBranch.id)}
                    >
                      AddPayment
                      
                    </button>
                   </div>
                   <div className="col-2">
                    <button
                      className="btn btn-success"
                      onClick={() => navigate("/salonBranchXGender/salonBranchXGenderUpsert/" + salonBranch.id)}
                    >
                      AddGender
                      
                    </button>
                   </div>
                   <div className="col-2">
                    <button
                      className="btn btn-success"
                      onClick={() => navigate("/salonBranchXService/salonBranchXServiceUpsert/" + salonBranch.id)}
                    >
                      AddService
                      
                    </button>
                   </div>
             
                <div className="col-3">
                  <button className="btn btn-success">
                    <i
                      className="bi bi-pencil-fill"
                      onClick={() =>
                        navigate("/salonBranch/salonBranchupsert/" + salonBranch.id)
                      }
                    ></i>
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => handleSalonBranchDelete(salonBranch.id)}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
              </div>
            ))}

            <div className="pagination">
              <button
                className="btn btn-link"
                disabled={pageNumber === 1}
                onClick={() => setPageNumber((prev) => prev - 1)}
              >
                Previous
              </button>
              <span> Page {pageNumber} </span>
              <button
                className="btn btn-link"
                disabled={data.result.length < pageSize}
                onClick={() => setPageNumber((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default SalonBranchList;
