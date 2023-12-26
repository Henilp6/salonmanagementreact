import React, { useEffect, useState } from "react";
import {
  useCreateFirstServiceMutation,
  useGetFirstServiceByIdQuery,
  useUpdateFirstServiceMutation,
} from "../../Apis/firstServiceApi";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Componets/Page/Common"; 
import { apiResponse } from "../../Interfaces";

const firstServiceData: { firstServiceName: string} = {
    firstServiceName: "",
};

function FirstServiceUpsert() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [firstServiceInputs, setFirstServiceInputs] = useState(firstServiceData);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createFirstService] = useCreateFirstServiceMutation();
  const [updateFirstService] = useUpdateFirstServiceMutation();
  const { data } = useGetFirstServiceByIdQuery(id);
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

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        firstServiceName: data.result.firstServiceName,
        isActive: data.result.isActive,
      };
      setFirstServiceInputs(tempData);
      setIsChecked(tempData.isActive);
    }
  }, [data]);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    // Update countryInputs with the new value of isActive
    setFirstServiceInputs((prevData) => ({
      ...prevData,
      isActive: !isChecked,
    }));
  };

  const handleFirstServiceInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, firstServiceInputs);
    setFirstServiceInputs(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("FirstServiceName", firstServiceInputs.firstServiceName);
    formData.append("IsActive", isChecked.toString());
    try {
      let response: apiResponse;
    if (id) {
      //update
      formData.append("Id", id);
      response = await updateFirstService({ data: formData, id });
      if (response != null && response.data?.isSuccess) {
        toastNotify("FirstService updated successfully", "success");
        navigate("/firstService/firstServicelist");
        setLoading(true);
      } else {
        toastNotify("Invalid FirstService Data", "error");
      }
      
    } else {
      //create
      response = await createFirstService(formData);
      if (response != null && response.data?.isSuccess) {
        toastNotify("FirstService created successfully", "success");
        navigate("/firstService/firstServicelist");
      } else {
        toastNotify("Invalid FirstService Data", "error");
      }
      
    }}catch (error) {
      console.error("API Error:", error);
      toastNotify("Error occurred", "error");
    }

    setLoading(false);
  };
  
  if (!userRole.includes("Admin")) {
    return null;
  }


  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className=" px-2 text-success">
        {id ? "Edit FirstService" : "Add FirstService"}
      </h3>
     

      <form method="post"  onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <label htmlFor="text">FirstService Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter firstServiceName"
              required
              name="firstServiceName"
              value={firstServiceInputs.firstServiceName}
              onChange={handleFirstServiceInput}
            />

           <label htmlFor="checkbox">Is Active</label>
            <input
              className="form-check-input"
              type="checkbox"
              name="isActive"
              value={isChecked.toString()}
              checked={isChecked}
              onChange={handleOnChange}
            />
          
           
            <div className="row">
              <div className="col-6">
                <button
                  type="submit"
                  className="btn btn-success form-control mt-3"
                >
                  {id ? "Update" : "Create"}
                </button>
              </div>
              <div className="col-6">
                <a
                  onClick={() => navigate("/firstService/firstServicelist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to FirstServiceList
                </a>
              </div>
            </div>
          </div>
         
        </div>
      </form>





    </div>
  );
}

export default FirstServiceUpsert;
