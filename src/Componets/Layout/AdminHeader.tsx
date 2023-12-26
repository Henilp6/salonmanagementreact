import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function AdminHeader() {
  const navigate = useNavigate();
  const [search, setSearchText] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const receivedRoles = ["Customer", "Admin", "Data Operator"]; 
  const [userRole, setUserRole] = useState(receivedRoles);

  const handleSearch = () => {
    navigate(`/search/${search}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    setLoggedIn(false);
    setUserName("");
    setUserRole([]);
    window.location.reload();
    navigate("/Home");
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

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-dark box-shadow mb-3 position-static">
        <div className="container-fluid">
          <NavLink className="nav-link text-light" aria-current="page" to="/">

            &nbsp;Salon Management Admin Header.....
          </NavLink>


          <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
            <ul className="navbar-nav flex-grow-1 me-auto">
           
            
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-light"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Salon's Type
                </a>
                <ul className="dropdown-menu">
                  <li className="nav-item">
                    <a
                      className="nav-link text-dark"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate("payment/paymentlist")
                      }
                    >
                      Payment
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-dark"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate("gender/genderlist")
                      }
                    >
                     Gender
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-dark"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("firstService/firstServicelist")}
                    >
                     Service
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-dark"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("employeeSize/employeeSizelist")}
                    >
                      Employee Size
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-dark"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("hourlyRate/hourlyRatelist")}
                    >
                      hourlyRate
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-dark"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("companyXIndustry/companyXIndustryUpsert/"+1)}
                    >
                     companyXIndustry
                    </a>
                  </li>

                    

                  <li className="nav-item">
                    <a
                      className="nav-link text-dark"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("company/companylist")}
                    >
                     Company
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-dark"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("parentService/parentServicelist")}
                    >
                     ParentService
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-dark"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("childService/childServicelist")}
                    >
                     ChildService
                     </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-dark"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("companyLocation/companyLocationUpsert/"+1)}
                    >
                     CompanyLocation
                    </a>
                  </li>

                </ul>
                </li>
              

                { (userRole.includes("Admin")  || userRole.includes("Data Operator") ) && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-light"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Location
                </a>
                <ul className="dropdown-menu">
                  <li className="nav-item">
                    <a
                      className="nav-link text-dark"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate("country/countrylist")
                      }
                    >
                      Country
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-dark"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate("state/statelist")
                      }
                    >
                      State
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-dark"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("city/citylist")}
                    >
                      City
                    </a>
                  </li>


                </ul>
              </li>
              )}

       


              { userRole.includes("Admin")  && (
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-light"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                User Management
              </a>

              <ul className="dropdown-menu">
                <li className="nav-item">
                  <a
                    className="nav-link text-dark"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("applicationRole/applicationRolelist")}
                  >
                    Role
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-dark"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("applicationUser/applicationUserlist")}
                  >
                    User
                  </a>
                </li>
              </ul>

            </li>
          )}
        </ul>
      </div>

          <div className="navbar-collapse collapse d-sm-inline-flex justify-content-end">
            <ul className="navbar-nav">
              {!loggedIn && (
                <>
                  <li className="nav-item text-white m-1">
                    <NavLink
                      className="btn btn-success btn-outlined rounded-pill text-white ms-8"
                      to="/register"
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item text-white m-1">
                    <NavLink
                      className="btn btn-success btn-outlined rounded-pill text-white ms-8"
                      style={{
                        border: "none",
                      }}
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
              {loggedIn && (
                <>
                  <li className="nav-item text-white m-1">
                    <span className="text-light me-2">Welcome, {userName}</span>
                  </li>

                  <li className="nav-item text-white m-1">
                    <button
                      className="btn btn-success btn-outlined rounded-pill text-white ms-8"
                      style={{
                        border: "none",
                      }}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default AdminHeader;