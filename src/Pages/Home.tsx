import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AdminHomePage, SalonListIndex } from "../Componets/Page/Home";

function Home() {
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

  return (
    <div>
      {!userRole.includes("Admin") && (
        
      <div className="container p-2">
         <div style={{ textAlign: 'center', backgroundColor: 'brown', padding: '20px' }}>
        <h1 style={{ color: 'white' }}>
          Welecome To NY Salon
        </h1>
      </div>
        <SalonListIndex/>
      </div>
        )}
        
      { userRole.includes("Admin") && (
      <div className="container p-2">
        <AdminHomePage/>
      </div>
       )}

    </div>
  )
}

export default Home;
