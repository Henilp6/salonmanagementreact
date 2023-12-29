import React, { useState } from "react";
import {
  useDeleteCountryMutation,
  useGetCountrysQuery,
} from "../../Apis/countryApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Componets/Page/Common"; 
import { countryModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";

import { debounce } from "lodash";
import PaginationComponent from "../../Componets/Page/Common/PaginationComponent";


function CountryList() {
  const [deleteCountry] = useDeleteCountryMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5); 
  const { data, isLoading,isError, refetch  } = useGetCountrysQuery({   search: searchQuery,
    pageSize: pageSize,
    pageNumber: pageNumber,
  });
  const navigate = useNavigate();

  const debouncedSearch = debounce(() => refetch(), 300);

  const handleCountryDelete = async (id: number) => {
    toast.promise(
      deleteCountry(id),
      {
        pending: "Processing your request...",
        success: "Country Deleted Successfully 👌",
        error: "Error encoutnered 🤯",
      },
      {
        theme: "dark",
      },
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
    setPageNumber(1);
    debouncedSearch();
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value, 10);
    setPageSize(newSize);
    setPageNumber(1); // Reset to the first page when page size changes
    debouncedSearch();
  };

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && !isError && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-success">Country List By Pagination</h1>
            <button
              className="btn btn-success"
              onClick={() => navigate("/country/countryupsert")}
              >
              Add New Country
            </button>
          </div>
          <div className="row border p-2">
            <div className="col-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="col-2">
              <button className="btn btn-primary" onClick={debouncedSearch}>
                Search
              </button>
            </div>
         
          </div>

          <div className="p-2">
            <div className="row border">
              <div className="col-4">CountryName</div>
              <div className="col-4">Is Active</div>
              <div className="col-4">Action</div>
            </div>

            {data.result.map((country: countryModel) => (
              <div className="row border" key={country.id}>
                <div className="col-4">{country.countryName}</div>
                <div className="col-4">{country.isActive?.toString()}</div>
                <div className="col-4">
                  <button className="btn btn-success">
                    <i
                      className="bi bi-pencil-fill"
                      onClick={() =>
                        navigate("/country/countryupsert/" + country.id)
                      }
                    ></i>
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => handleCountryDelete(country.id)}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
              </div>
            ))}

            <div className="pagination">
              <button
                className="btn btn-link"
                disabled={pageNumber === 1}
                onClick={() => setPageNumber((prev) => prev - 1)}
              >
                Previous
              </button>
              <span> Page {pageNumber} </span>
              <button
                className="btn btn-link"
                disabled={data.result.length < pageSize}
                onClick={() => setPageNumber((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default CountryList;

