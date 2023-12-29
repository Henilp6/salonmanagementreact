import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [search, setSearchText] = useState("");
  const [location, setLocation] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const receivedRoles = ["Customer", "Admin","Data Operator"]; 
  const [userRole, setUserRole] = useState(receivedRoles);

  // const handleSearch = () => {
  //   navigate(`/search/search${search}/location${location}`);
  // };
  const handleSearch = () => {
  
  //  if(search){
  //   navigate(`/search/${search}`);
  //  }
  //  if(location){
  //   navigate(`/search/${location}`);
  //  }
   if(search || location){
    navigate(`/search/${search}/${location}`);
   }
    
   
  };

//    const handleSearch = () => {
//     const searchvalue = search.trim();
//     const locationvalue = location.trim();
// debugger;
//     if (searchvalue || locationvalue) {

//       const route = `/search/search?${searchvalue}&location=${locationvalue}`;
//       navigate(route);
//     }
//   };

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

            &nbsp; NY Salon
          </NavLink>


          <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
            <ul className="navbar-nav flex-grow-1 me-auto">
            { (!userRole.includes("Admin") ) && (
              <li className="ms-2 nav-item">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search SalonBranch"
                    value={search}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  <button
                    className="btn btn-primary ms-1"
                    type="button"
                    onClick={handleSearch}
                  >

                    Search
                  </button>
                </div>
              </li>
                )}


{/* { userRole.includes("Customer")  && (
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
          )} */}
        
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
export default Header;