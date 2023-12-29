import React, { useState, useEffect } from "react";
import { MainLoader } from "../Common";
import { useParams } from "react-router-dom";
import CompanyIndex from "./SalonBranchIndex";
import { salonBranchModel } from "../../../Interfaces";
import { useDispatch } from "react-redux";
import { useGetSalonBranchSearchLocationByLazyLoadingQuery } from "../../../Apis/salonBranchApi";
import SalonBranchIndex from "./SalonBranchIndex";

function SalonBranchSearchIndex() {
  const [pageNum, setPageNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [allSalonBranchs, setAllSalonBranchs] = useState<salonBranchModel[]>([]);
  debugger;
  const { search} = useParams();
  const { location } = useParams();

  const { data, isLoading } = useGetSalonBranchSearchLocationByLazyLoadingQuery({
    pageNum,
    search: search || "",
    location: location || "",
  });

  useEffect(() => {
    if (!isLoading && data && data.result) {
      setAllSalonBranchs((prevSalonBranchs) => [...prevSalonBranchs, ...data.result]);
      setLoading(false);
      setHasMore(data.result.length > 0);
    }
  }, [isLoading, data]);

  const handleScroll = () => {
    if (!loading && hasMore) {
      const isReachedScrollEnd =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50;

      if (isReachedScrollEnd) {
        setLoading(true);
        setPageNum((prevPageNum) => prevPageNum + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);

  return (
    <div className="container row">
      <div className="my-3">
        <ul className="nav w-100 d-flex justify-content-center"></ul>
      </div>

      {allSalonBranchs.length > 0 &&
        allSalonBranchs.map((salonBranch: salonBranchModel, index: number) => (
          <SalonBranchIndex salonBranch={salonBranch} key={index} />
        ))}

      {loading && <MainLoader />}
      {!loading && !hasMore && <p>No more Salon to load</p>}
    </div>
  );
}
export default SalonBranchSearchIndex;

