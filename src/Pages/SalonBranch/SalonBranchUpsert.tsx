import React, { useEffect, useState } from "react";
import {
  useCreateSalonBranchMutation,
  useGetSalonBranchByIdQuery,
  useUpdateSalonBranchMutation,
} from "../../Apis/salonBranchApi";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Componets/Page/Common"; 
import { apiResponse } from "../../Interfaces";

import { useGetAllCountrysQuery } from "../../Apis/countryApi";
import { useGetAllCitysQuery } from "../../Apis/cityApi";
import { stateModel, countryModel, cityModel } from "../../Interfaces";
import { useGetStatesByCountryIdQuery } from "../../Apis/stateApi";
import { useGetCitysByStateIdQuery } from "../../Apis/cityApi";

const salonBranchData: {   branchName: string;
  yearofEstablishment: number;
  image: string;
  description: string; 
  mobileNumber : number; 
  email : string; 
  openTime : string; 
  closeTime : string; 
  address  : string; 
  area  : string; 
  countryId?: number;
  stateId?: number;
  cityId?: number;
} = {
  branchName: "",
  yearofEstablishment: 0,
  image: "",
  description: "", 
  mobileNumber: 0, 
  email : "", 
  openTime : "", 
  closeTime : "", 
  address  : "",  
  area: "", 
  countryId: undefined, 
  stateId: undefined,
  cityId: undefined,
};

function SalonBranchUpsert() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [salonBranchInputs, setSalonBranchInputs] = useState(salonBranchData);
  const [isChecked, setIsChecked] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createSalonBranch] = useCreateSalonBranchMutation();
  const [updateSalonBranch] = useUpdateSalonBranchMutation();
  const { data } = useGetSalonBranchByIdQuery(id);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const receivedRoles = ["Customer", "Admin", "Data Operator"]; 
  const [userRole, setUserRole] = useState(receivedRoles);
  const { data: countryData } = useGetAllCountrysQuery(null);
  const [selectedCountryId, setSelectedCountryId] = useState<number | undefined>(salonBranchInputs.countryId);
  //const { data: statesData } = useGetStatesByCountryIdQuery(selectedCountryId);
  const [selectedStateId, setSelectedStateId] = useState<number | undefined>(salonBranchInputs.stateId);


  const { data: cityData } = useGetCitysByStateIdQuery(selectedStateId);
  const [selectedCityId, setSelectedCityId] = useState<number | undefined>(salonBranchInputs.cityId);
  const [sId, SetStateId] = useState<number | undefined>();

  const { data: statesData } = useGetStatesByCountryIdQuery(
    salonBranchInputs.countryId || 0
  );
  const [stateData, setStatesData] = useState<stateModel[]>([]);

 
  useEffect(() => {
    // if (id) {
    // Fetch state data by ID
    // const { data } = useGetStateByIdQuery(id);
    if (statesData && statesData.result) {

      setStatesData(statesData.result);
    }
    // }
  });


  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountryId = parseInt(e.target.value, 10);
    setSelectedCountryId(selectedCountryId);
    setSalonBranchInputs((prevData) => ({
      ...prevData,
      countryId: selectedCountryId,
    }));
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStateId = parseInt(e.target.value, 10);
    setSelectedStateId(selectedStateId);
    setSalonBranchInputs((prevData) => ({
      ...prevData,
      stateId: selectedStateId,
    }));
  };
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCityId = parseInt(e.target.value, 10);
    setSelectedCityId(selectedCityId);
    setSalonBranchInputs((prevData) => ({
      ...prevData,
      cityId: selectedCityId,
    }));
  };

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
        branchName: data.result.branchName,
        yearofEstablishment: data.result.yearofEstablishment,
        image: data.result.image,
        description:data.result.description,
        mobileNumber: data.result.mobileNumber, 
        email : data.result.email, 
        openTime : data.result.openTime, 
        closeTime : data.result.closeTime, 
        address  : data.result.address, 
        area: data.result.area, 
        countryId: data.result.countryId,
        stateId: data.result.stateId,
        cityId: data.result.cityId,
        isActive: data.result.isActive,
        isDeleted: data.result.isDeleted,
      };
      setSalonBranchInputs(tempData);
      setIsChecked(tempData.isActive);
      setIsDeleted(tempData.isDeleted);
    }
  }, [data]);


 
  const handleOnChange = () => {
    setIsChecked(!isChecked);
   
    setSalonBranchInputs((prevData) => ({
      ...prevData,
      isActive: !isChecked,
    }));
  };
  const handleOnChangee = () => {
    setIsDeleted(!isDeleted);
    setSalonBranchInputs((prevData) => ({
      ...prevData,
      isDeleted: !isDeleted,
    }));
  };



 
  const handleSalonBranchInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, salonBranchInputs);
    setSalonBranchInputs(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("BranchName", salonBranchInputs.branchName);
    formData.append("YearofEstablishment", salonBranchInputs.yearofEstablishment.toString());
    formData.append("Description", salonBranchInputs.description);
    formData.append("MobileNumber", salonBranchInputs.mobileNumber.toString());
    formData.append("Email", salonBranchInputs.email);
    formData.append("Image", salonBranchInputs.image);
    formData.append("OpenTime", salonBranchInputs.openTime);
    formData.append("CloseTime", salonBranchInputs.closeTime);
    formData.append("Address", salonBranchInputs.address);
    formData.append("CloseTime", salonBranchInputs.closeTime);
    formData.append("Area", salonBranchInputs.area);
    formData.append("CountryId", salonBranchInputs.countryId?.toString() || "");
    formData.append("StateId", salonBranchInputs.stateId?.toString() || "");
    formData.append("CityId", salonBranchInputs.cityId?.toString() || "");
    formData.append("IsActive", isChecked.toString());
    formData.append("IsDeleted", isDeleted.toString());
    try {
      debugger;
      let response: apiResponse;
    if (id) {
      //update
      formData.append("Id", id);
      response = await updateSalonBranch({ data: formData, id });
      if (response != null && response.data?.isSuccess) {
        toastNotify("SalonBranch updated successfully", "success");
        navigate("/salonBranch/salonBranchlist");
        setLoading(true);
      } else {
        toastNotify("Invalid SalonBranch Data", "error");
      }
      
    } else {
      //create
      response = await createSalonBranch(formData);
      
      if (response != null && response.data?.isSuccess) {
        toastNotify("SalonBranch created successfully", "success");
        navigate("/salonBranch/salonBranchlist");
      } else {
        toastNotify("Invalid SalonBranch Data", "error");
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
        {id ? "Edit SalonBranch" : "Add SalonBranch"}
      </h3>
     

      <form method="post"  onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
          <label htmlFor="text">SalonBranch Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter salonBranchName"
              required
              name="branchName"
              value={salonBranchInputs.branchName}
              onChange={handleSalonBranchInput}
            />

            <label htmlFor="number">Year of Establishment</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter year of establishment"
              required
              name="yearofEstablishment"
              value={salonBranchInputs.yearofEstablishment}
              onChange={handleSalonBranchInput}
            />

            <label htmlFor="text">Image</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter ImageUrl"
              required
              name="image"
              value={salonBranchInputs.image}
              onChange={handleSalonBranchInput}
            />

            <label htmlFor="text">Description</label>
            <textarea
              className="form-control"
              placeholder="Enter description"
              required
              name="description"
              value={salonBranchInputs.description}
              onChange={handleSalonBranchInput}
            ></textarea>

            <label htmlFor="number">Mobile Number</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter mobile number"
              required
              name="mobileNumber"
              value={salonBranchInputs.mobileNumber}
              onChange={handleSalonBranchInput}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              required
              name="email"
              value={salonBranchInputs.email}
              onChange={handleSalonBranchInput}
            />

            <label htmlFor="text">Open Time</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter open time"
              required
              name="openTime"
              value={salonBranchInputs.openTime}
              onChange={handleSalonBranchInput}
            />

            <label htmlFor="text">Close Time</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter close time"
              required
              name="closeTime"
              value={salonBranchInputs.closeTime}
              onChange={handleSalonBranchInput}
            />

            <label htmlFor="text">Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter address"
              required
              name="address"
              value={salonBranchInputs.address}
              onChange={handleSalonBranchInput}
            />

            <label htmlFor="text">Area</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter area"
              required
              name="area"
              value={salonBranchInputs.area}
              onChange={handleSalonBranchInput}
            />
           <label htmlFor="selectCountry">Country</label>
            <select
              className="form-control"
              id="selectCountry"
              value={selectedCountryId || ""}
              onChange={handleCountryChange}
            >
              <option value="">Select Country</option>
              {countryData?.result?.map((country:countryModel) => (
                <option key={country.id} value={country.id}>
                  {country.countryName}
                </option>
              ))}
            </select>

            <label htmlFor="selectState">State</label>
            <select
              className="form-control"
              id="selectState"
              value={selectedStateId || ""}
              onChange={handleStateChange}
            >
              <option value="">Select State</option>
              {statesData?.result?.map((state: stateModel) => (
                <option key={state.id} value={state.id}>
                  {state.stateName}
                </option>
              ))}
            </select>
            <label htmlFor="selectCity">City</label>


            <label htmlFor="city">Select City</label>
            <select
              className="form-control"
              name="cityId"
              value={salonBranchInputs.cityId}
              onChange={(e) => handleCityChange(e)}
            >
              <option value="">Select City</option>
              {cityData?.result.map((city: cityModel) => (
                
                  <option key={city.id} value={city.id}>
                    {city.cityName}
                  </option>
                
              ))}
            </select>

            


            <label htmlFor="checkbox">Is Active</label>
            <input
              className="form-check-input"
              type="checkbox"
              name="isActive"
              value={isChecked.toString()}
              checked={isChecked}
              onChange={handleOnChange}
            />
           <label htmlFor="checkbox">Is Deleted</label>
            <input
              className="form-check-input"
              type="checkbox"
              name="isDeleted"
              value={isDeleted.toString()}
              checked={isDeleted}
              onChange={handleOnChangee}
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
                  onClick={() => navigate("/salonBranch/salonBranchlist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to SalonBranchList
                </a>
              </div>
            </div>
          </div>
         
        </div>
      </form>





    </div>
  );
}

export default SalonBranchUpsert;
