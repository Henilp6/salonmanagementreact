import React, { useEffect, useState } from "react";
import {
  useCreatePaymentMutation,
  useGetPaymentByIdQuery,
  useUpdatePaymentMutation,
} from "../../Apis/paymentApi";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Componets/Page/Common"; 
import { apiResponse } from "../../Interfaces";

const paymentData: { paymentName: string} = {
    paymentName: "",
};

function PaymentUpsert() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [paymentInputs, setPaymentInputs] = useState(paymentData);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createPayment] = useCreatePaymentMutation();
  const [updatePayment] = useUpdatePaymentMutation();
  const { data } = useGetPaymentByIdQuery(id);
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
        paymentName: data.result.paymentName,
        isActive: data.result.isActive,
      };
      setPaymentInputs(tempData);
      setIsChecked(tempData.isActive);
    }
  }, [data]);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    // Update countryInputs with the new value of isActive
    setPaymentInputs((prevData) => ({
      ...prevData,
      isActive: !isChecked,
    }));
  };

  const handlePaymentInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, paymentInputs);
    setPaymentInputs(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("PaymentName", paymentInputs.paymentName);
    formData.append("IsActive", isChecked.toString());
    try {
      let response: apiResponse;
    if (id) {
      //update
      formData.append("Id", id);
      response = await updatePayment({ data: formData, id });
      if (response != null && response.data?.isSuccess) {
        toastNotify("Payment updated successfully", "success");
        navigate("/payment/paymentlist");
        setLoading(true);
      } else {
        toastNotify("Invalid Payment Data", "error");
      }
      
    } else {
      //create
      response = await createPayment(formData);
      if (response != null && response.data?.isSuccess) {
        toastNotify("Payment created successfully", "success");
        navigate("/payment/paymentlist");
      } else {
        toastNotify("Invalid Payment Data", "error");
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
        {id ? "Edit Payment" : "Add Payment"}
      </h3>
     

      <form method="post"  onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <label htmlFor="text">Payment Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter paymentName"
              required
              name="paymentName"
              value={paymentInputs.paymentName}
              onChange={handlePaymentInput}
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
                  onClick={() => navigate("/payment/paymentlist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to PaymentList
                </a>
              </div>
            </div>
          </div>
         
        </div>
      </form>





    </div>
  );
}

export default PaymentUpsert;
