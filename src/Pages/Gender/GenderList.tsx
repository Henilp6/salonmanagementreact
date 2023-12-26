import React, { useEffect, useState } from "react";
import {
  useDeleteGenderMutation,
  useGetGendersQuery,
} from "../../Apis/GenderApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Componets/Page/Common"; 
import { genderModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";

import { debounce } from "lodash";

function GenderList() {
  const [deleteGender] = useDeleteGenderMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { data, isLoading, isError, refetch } = useGetGendersQuery({
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

  const handleGenderDelete = async (id: number) => {
    toast.promise(
      deleteGender(id),
      {
        pending: "Processing your request...",
        success: "Gender Deleted Successfully 👌",
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
            <h1 className="text-success">Gender List</h1>

            <button
              className="btn btn-success"
              onClick={() => navigate("/gender/genderupsert")}
            >
              Add New Gender
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
              <div className="col-4">Gender Type</div>
              <div className="col-2">IsActive</div>
              <div className="col-4">Action</div>
            </div>

            {data.result.map((gender: genderModel) => (
              <div className="row border" key={gender.id}>
                <div className="col-4">{gender.genderType}</div>
                <div className="col-2">{gender.isActive?.toString()}</div>
                <div className="col-4">
                  <button className="btn btn-success">
                    <i
                      className="bi bi-pencil-fill"
                      onClick={() =>
                        navigate("/gender/genderupsert/" + gender.id)
                      }
                    ></i>
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => handleGenderDelete(gender.id)}
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
export default GenderList;
