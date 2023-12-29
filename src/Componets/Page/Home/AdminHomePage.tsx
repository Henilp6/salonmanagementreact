import React, { useState, useEffect } from "react";
import CompanyIndex from "./SalonBranchIndex";
import { useDispatch } from "react-redux";
import { MainLoader,MiniLoader } from "../Common";

function AdminHomePage() {
  const [pageNum, setPageNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const dispatch = useDispatch();
  const search = "";

 


 

  return (
    <div className="container row">
      <h2>
        Hello Admin
      </h2>

    </div>
  );
}

export default AdminHomePage;




