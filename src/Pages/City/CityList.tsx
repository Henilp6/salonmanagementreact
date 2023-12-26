import React, { useState } from "react";
import {
  useDeleteCityMutation,
  useGetCitysQuery,
} from "../../Apis/cityApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Componets/Page/Common";
import { cityModel } from "../../Interfaces";
import { useNavigate } from "react-router";
import { debounce } from "lodash";

function CityList() {
  const [deleteCity] = useDeleteCityMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { data, isLoading, isError, refetch } = useGetCitysQuery({
    search: searchQuery,
    pageSize: pageSize,
    pageNumber: pageNumber,
  });
  const navigate = useNavigate();

  const debouncedSearch = debounce(() => refetch(), 300);

  const handleCityDelete = async (id: number) => {
    toast.promise(
      deleteCity(id),
      {
        pending: "Processing your request...",
        success: "City Deleted Successfully 👌",
        error: "Error encoutnered 🤯",
      },
      {
        theme: "dark",
      }
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
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-success">City List</h1>

            <button
              className="btn btn-success"
              onClick={() => navigate("/city/cityupsert")}
            >
              Add New City
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
            <div className="col-1">
              <label htmlFor="pageSize">Page Size:</label>
              <select
                id="pageSize"
                className="form-control"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>


          <div className="p-2">
            <div className="row border">
              <div className="col-1">Id</div>
              <div className="col-2">City Name</div>
              <div className="col-2">Country Name</div>
              <div className="col-2">City Name</div>
              <div className="col-2">Is Active</div>
              <div className="col-3">Action</div>
            </div>

            {data.result.map((city: cityModel) => {
              return (
                <div className="row border" key={city.id}>
                  <div className="col-1">{city.id}</div>
                  <div className="col-2">{city.cityName}</div>
                  <div className="col-2">{city.country?.countryName}</div>
                  <div className="col-2">{city.state?.stateName}</div>
                  <div className="col-2">{city.isActive?.toString()}</div>
                  <div className="col-3">
                    <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() =>
                          navigate("/city/cityupsert/" + city.id)
                        }
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleCityDelete(city.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </div>
              );
            })}

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

export default CityList;
