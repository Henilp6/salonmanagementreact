import React, { useEffect, useState } from "react";
import {
  useDeleteApplicationRoleMutation,
  useGetApplicationRolesQuery,
} from "../../Apis/applicationRoleApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Componets/Page/Common"; 
import { applicationRoleModel } from "../../Interfaces";
import { useNavigate } from "react-router";


function ApplicationRoleList() {
  const [deleteApplicationRole] = useDeleteApplicationRoleMutation();
  const { data, isLoading } = useGetApplicationRolesQuery(null);
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

  const handleApplicationRoleDelete = async (id: number) => {
    toast.promise(
      deleteApplicationRole(id),
      {
        pending: "Processing your request...",
        success: "Company Deleted Successfully 👌",
        error: "Error encoutnered 🤯",
      },
      {
        theme: "dark",
      }
    );
  };

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-success">ApplicationRole List</h1>

            <button
              className="btn btn-success"
              onClick={() => navigate("/applicationRole/applicationRoleupsert")}
            >
              Add New Role
            </button>
          </div>

          <div className="p-2">
            <div className="row border">
              <div className="col-1">Id</div>
              <div className="col-2">Role Name</div>
              <div className="col-3">Action</div>
            </div>

            {data.result.map((company: applicationRoleModel) => {
              return (
                <div className="row border" key={company.id}>
                  <div className="col-1">{company.id}</div>
                  <div className="col-2">{company.name}</div>

                  <div className="col-2">
                  <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() =>
                          navigate("/applicationRole/applicationRoleupsert/" + company.id)
                        }
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleApplicationRoleDelete(company.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default ApplicationRoleList;
