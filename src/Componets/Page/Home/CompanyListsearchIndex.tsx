import React, { useState, useEffect } from "react";
import { MainLoader } from "../Common";
import { useParams } from "react-router-dom";
import CompanyIndex from "./CompanyIndex";

function CompanyListSearchIndex() {
  const { search } = useParams();
  const [pageNum, setPageNum] = useState(0);
  const [loading, setLoading] = useState(false);





  return (
    <div className="container row">
      <div className="my-3">
        <ul className="nav w-100 d-flex justify-content-center"></ul>
      </div>

    Hellooooooooooo Serach
    </div>
  );
}

export default CompanyListSearchIndex;
