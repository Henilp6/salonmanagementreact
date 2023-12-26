import React, { useEffect, useState } from 'react'
import { useDeleteApplicationUserMutation,
    useGetApplicationUsersQuery 
} from "../../Apis/applicationUserApi";
import { toast } from "react-toastify";
import { MainLoader } from '../../Componets/Page/Common';
import { applicationUserModel } from "../../Interfaces";
import { useNavigate } from "react-router";


function ApplicationUserList() {
  const [deleteApplicationUser] = useDeleteApplicationUserMutation();
  const { data, isLoading } = useGetApplicationUsersQuery(null);
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
  
  const handleApplicationDelete = async (id: number) => {
    toast.promise(
      deleteApplicationUser(id),
      {
        pending: "Processing your request...",
        success: "Menu Item Deleted Successfully 👌",
        error: "Error encoutnered 🤯",
      },
      {
        theme: "dark",
      }
    );
  };
  
  if (!userRole.includes("Admin")) {
    return null;
  }
  return (
    <>
    {isLoading && <MainLoader />}
    {!isLoading && (
      <div className="table p-5">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="text-success">Application User List</h1>
          <button
            className="btn btn-success"
            onClick={() => navigate("/applicationUser/applicationUserupsert")}
          >
            Add New ApplicationUser
          </button>
        </div>
        <div className="p-2">
          <div className="row border">
            <div className="col-3">Id</div>
            <div className="col-5">User name</div>
            {/* <div className="col-3">Is Active</div> */}
            <div className="col-4">Action</div>
          </div>

          {data.result.map((payment: applicationUserModel) => {
            return (
              <div className="row border" key={payment.id}>
                <div className="col-3">{payment.id}</div>
                <div className="col-5">{payment.userName}</div>
                {/* <div className="col-3">{payment.isActive}</div> */}
                <div className="col-4">
                  <button className="btn btn-success">
                    <i
                      className="bi bi-pencil-fill"
                      onClick={() =>
                        navigate("/applicationUser/applicationUserupsert/" + payment.id)
                      }
                    ></i>
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => handleApplicationDelete(payment.id)}
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

export default ApplicationUserList