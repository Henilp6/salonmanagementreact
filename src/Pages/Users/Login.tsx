import React, { useState } from "react";
import { toastNotify, inputHelper } from "../../Helper";
import { useNavigate } from "react-router-dom";
import { MainLoader } from "../../Componets/Page/Common";
import { useLoginUserMutation } from "../../Apis/usersApi";
import { apiResponse, loginResponce, loginRequest } from "../../Interfaces";
import { SessionToken } from "../../Utility/SD";
import { UserDetails } from "../../Utility/SD";

function Login() {
  const [loginUser] = useLoginUserMutation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
  });
  const [error, setError] = useState("");

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
    formData.append("UserName", userInput.userName);
    formData.append("Password", userInput.password);
    
    try {
      const response: apiResponse = await loginUser(formData);
      console.log(JSON.stringify(response));
      if (response.data?.isSuccess == true) {
        localStorage.setItem("token", response.data?.result.token);
        localStorage.setItem(
          "userDetails",
          JSON.stringify(response.data?.result.applicationUser)
        );
        toastNotify("Login successful!");
        navigate("/");
        window.location.reload();
      } else if (response.error) {
        setError(response.error?.data.errorMessages[0]);
      }
    } catch (error) {
      setError("An error occurred while logging in. Please try again.");
    }
    setLoading(false);
  };

  // Use this function to check if the user is authenticated (has a valid token)
  const isAuthenticated = (): boolean => {
    return !!localStorage.getItem("token");
  };

  // Use this function to get the user details if authenticated
  const getUserDetails = (): UserDetails | null => {
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      return JSON.parse(storedUserDetails);
    }
    return null;
  };

  return (
    <div className="container text-center">
      {loading && <MainLoader />}
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5">Login</h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter UserName"
              required
              name="userName"
              value={userInput.userName}
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
        <div className="mt-2">
          {error && <p className="text-danger">{error}</p>}
          <button
            type="submit"
            className="btn btn-success"
            style={{ width: "200px" }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
