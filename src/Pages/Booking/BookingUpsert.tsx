import React, { useEffect, useState } from "react";
import {
  useCreateBookingMutation,
  useGetBookingByIdQuery,
  useUpdateBookingMutation,
} from "../../Apis/bookingApi";
import { useGetAllSalonBranchsQuery } from "../../Apis/salonBranchApi";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Componets/Page/Common"; 
import { apiResponse } from "../../Interfaces";

const bookingData: {     customerName: string;
  customerMobileNumber: number;
  customerEmail: string;
  bookingDate: Date;
  timming: number;
  salonBranchId?: number;
} = {
  customerName: "",
  customerMobileNumber: 0,
  customerEmail: "",
  bookingDate: new Date(),
  timming: 0,
  salonBranchId: undefined,

};

function BookingUpsert() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [bookingInputs, setBookingInputs] = useState(bookingData);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createBooking] = useCreateBookingMutation();
  const [updateBooking] = useUpdateBookingMutation();
  const { data } = useGetBookingByIdQuery(id);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const receivedRoles = ["Customer", "Admin", "Data Operator"]; 
  const [userRole, setUserRole] = useState(receivedRoles);
  const { data: salonBranchsData } = useGetAllSalonBranchsQuery(null);

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
        customerName: data.result.customerName,
  customerMobileNumber: data.result.customerMobileNumber,
  customerEmail: data.result.customerEmail,
  bookingDate: data.result.bookingDate,
  timming: data.result.timming,
  salonBranchId: data.result.salonBranchId,
      };
      setBookingInputs(tempData);
    }
  }, [data]);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    // Update countryInputs with the new value of isActive
    setBookingInputs((prevData) => ({
      ...prevData,
      isActive: !isChecked,
    }));
  };

  const handleBookingInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, bookingInputs);
    setBookingInputs(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("CustomerName", bookingInputs.customerName);
    formData.append("CustomerMobileNumber", bookingInputs.customerMobileNumber.toString());
    formData.append("CustomerEmail", bookingInputs.customerEmail);
    formData.append("BookingDate", bookingInputs.bookingDate.toDateString());
    formData.append("SalonBranchId", bookingInputs.salonBranchId?.toString() || "");
    try {
      let response: apiResponse;
    if (id) {
      //update
      formData.append("Id", id);
      response = await updateBooking({ data: formData, id });
      if (response != null && response.data?.isSuccess) {
        toastNotify("Booking updated successfully", "success");
        navigate("/booking/bookinglist");
        setLoading(true);
      } else {
        toastNotify("Invalid Booking Data", "error");
      }
      
    } else {
      //create
      response = await createBooking(formData);
      if (response != null && response.data?.isSuccess) {
        toastNotify("Booking created successfully", "success");
        navigate("/booking/bookinglist");
      } else {
        toastNotify("Invalid booking Data", "error");
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
        {id ? "Edit Booking" : "Add Booking"}
      </h3>
     

      <form method="post"  onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
        
          <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="customerName"
              value={bookingInputs.customerName}
              onChange={handleBookingInput}
            />
             <input
              type="number"
              className="form-control"
              placeholder="Enter Number"
              required
              name="customerMobileNumber"
              value={bookingInputs.customerMobileNumber}
              onChange={handleBookingInput}
            />
             <input
              type="text"
              className="form-control"
              placeholder="Enter EmailId"
              required
              name="customerEmail"
              value={bookingInputs.customerEmail}
              onChange={handleBookingInput}
            />
              <input
              type="text"
              className="form-control"
              placeholder="Enter timming"
              required
              name="timming"
              value={bookingInputs.timming}
              onChange={handleBookingInput}
            />
            <label htmlFor="bookingDate" className="form-label">
                Booking Date
              </label>
              <input
                type="date"
                className="form-control"
                id="bookingDate"
                name="bookingDate"
                value={bookingInputs.bookingDate.toDateString().split('T')[0]} // Format date for input
                onChange={handleBookingInput}
                required
              />

        

<label htmlFor="salonBranch">Select SalonBranch</label>
            <select
              className="form-control"
              name="salonBranchId"
              value={bookingInputs.salonBranchId}
              onChange={(e) =>
                setBookingInputs((prevData) => ({
                  ...prevData,
                  salonBranchId: parseInt(e.target.value),
                }))
              }
            >
              <option value="">Select SalonBranch</option>
              {salonBranchsData?.result.map((salonBranch:any) => (
                <option key={salonBranch.id} value={salonBranch.id}>
                  {salonBranch.branchName}
                </option>
              ))}
            </select>
        
    
           
         
          
           
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
                  onClick={() => navigate("/booking/bookinglist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to BookingList
                </a>
              </div>
            </div>
          </div>
         
        </div>
      </form>





    </div>
  );
}

export default BookingUpsert;
