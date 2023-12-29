import React, { useState } from "react";
import { toastNotify,inputHelper } from "../../Helper";
import { SD_Roles } from "../../Utility/SD";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Componets/Page/Common";
import { apiResponse } from "../../Interfaces";
import { useRegisterUserMutation } from "../../Apis/usersApi";



function Register() {
  const [registerUser] = useRegisterUserMutation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    password: "",
    phoneNumber: "",
    address: "",
    email: "",
  });

  const handleUserInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    
    const formData = new FormData();

    formData.append("FirstName", userInput.firstName);
    formData.append("LastName", userInput.lastName);
    formData.append("Address", userInput.address);
    formData.append("Email", userInput.email);
    formData.append("PhoneNumber", userInput.phoneNumber);
    formData.append("Password", userInput.password);

    console.log(formData);
    const response = await registerUser(formData);

    // const response: apiResponse = await registerUser({
    //   firstName: userInput.firstName,
    //   lastName: userInput.lastName,
    //   password: userInput.password,
    //   phoneNumber: userInput.phoneNumber,
    //   address: userInput.address,
    //   email: userInput.email,
    // });

    if (response) {
      toastNotify("Registeration successful! Please login to continue.");
      navigate("/login");
    } 
    setLoading(false);
  };

  return (
    <div className="container text-center">
      {loading && <MainLoader />}
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5">Register</h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter FirstName"
              required
              name="firstName"
              value={userInput.firstName}
              onChange={handleUserInput}
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter LastName"
              required
              name="lastName"
              value={userInput.lastName}
              onChange={handleUserInput}
            />
          </div>
       

          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="phoneNumber"
              className="form-control"
              placeholder="Enter PhoneNumber"
              required
              name="phoneNumber"
              value={userInput.phoneNumber}
              onChange={handleUserInput}
            />
          </div>

          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              required
              name="email"
              value={userInput.email}
              onChange={handleUserInput}
            />
          </div>
          
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              required
              name="password"
              value={userInput.password}
              onChange={handleUserInput}
            />
          </div>

       
        </div>
        <div className="mt-5">
          <button type="submit" className="btn btn-success" disabled={loading}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;


  