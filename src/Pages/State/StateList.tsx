import React, { useState } from "react";
import {
  useDeleteStateMutation,
  useGetStatesQuery,
} from "../../Apis/stateApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Componets/Page/Common";
import { stateModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

function StateList() {
  const [deleteState] = useDeleteStateMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { data, isLoading, isError, refetch } = useGetStatesQuery({
    search: searchQuery,
    pageSize: pageSize,
    pageNumber: pageNumber,
  });
  const navigate = useNavigate();

  const debouncedSearch = debounce(() => refetch(), 300);

  const handleStateDelete = async (id: number) => {
    toast.promise(
      deleteState(id),
      {
        pending: "Processing your request...",
        success: "State Deleted Successfully 👌",
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
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-success">State List</h1>

            <button
              className="btn btn-success"
              onClick={() => navigate("/state/stateupsert")}
            >
              Add New State
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
              <div className="col-3">StateName</div>
              <div className="col-3">CountryName</div>
              <div className="col-3">IsActive</div>
              <div className="col-2">Action</div>
            </div>

            {data.result.map((state: stateModel) => {
              return (
                <div className="row border" key={state.id}>
                  <div className="col-3">{state.stateName}</div>
                  <div className="col-3">{state.country?.countryName}</div>
                  <div className="col-3">{state.isActive?.toString()}</div>
                  <div className="col-2">
                    <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() =>
                          navigate("/state/stateupsert/" + state.id)
                        }
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleStateDelete(state.id)}
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

export default StateList;
