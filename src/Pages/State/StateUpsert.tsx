import React, { useEffect, useState } from "react";
import {
  useCreateStateMutation,
  useGetStateByIdQuery,
  useUpdateStateMutation,
} from "../../Apis/stateApi";
import { useGetAllCountrysQuery } from "../../Apis/countryApi";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Componets/Page/Common"; 

const stateData: { stateName: string; countryId?: number } = {
  stateName: "",
  countryId: undefined,
  // isActive: false,
};

function StateUpsert() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [stateInputs, setStateInputs] = useState(stateData);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createState] = useCreateStateMutation();
  const [updateState] = useUpdateStateMutation();
  const { data } = useGetStateByIdQuery(id);
  const { data: countriesData } = useGetAllCountrysQuery(null);

  // useEffect(() => {
  //   if (data && data.result) {
  //     const tempData = {
  //       stateName: data.result.stateName,
  //       countryId: data.result.countryId,
  //       isActive: data.result.isActive,
  //     };
  //     setStateInputs(tempData);
  //     setIsChecked(tempData.isActive);
  //   }
  // }, [data]);

  useEffect(() => {
    if (id) {
      // Fetch state data by ID
     // const { data } = useGetStateByIdQuery(id);
      if (data && data.result) {
        const tempData = {
          stateName: data.result.stateName,
          countryId: data.result.countryId,
          isActive: data.result.isActive,
        };
        setStateInputs(tempData);
        setIsChecked(tempData.isActive);
      }
    }
  }, [id]);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    // Update StateInputs with the new value of isActive
    setStateInputs((prevData) => ({
      ...prevData,
      isActive: !isChecked,
    }));
  };

  const handleStateInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, stateInputs);
    setStateInputs(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("StateName", stateInputs.stateName);
    formData.append("IsActive", isChecked.toString());
    formData.append("CountryId", stateInputs.countryId?.toString() || "");

    let response;

    if (id) {
      //update
      formData.append("Id", id);
      response = await updateState({ data: formData, id });
      toastNotify("State updated successfully", "success");
    } else {
      //create
      response = await createState(formData);
      toastNotify("State created successfully", "success");
    }

    if (response) {
      setLoading(false);
      navigate("/state/statelist");
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className=" px-2 text-success">{id ? "Edit State" : "Add State"}</h3>
      <form method="post" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="stateName"
              value={stateInputs.stateName}
              onChange={handleStateInput}
            />

        

<label htmlFor="country">Select Country</label>
            <select
              className="form-control"
              name="countryId"
              value={stateInputs.countryId}
              onChange={(e) =>
                setStateInputs((prevData) => ({
                  ...prevData,
                  countryId: parseInt(e.target.value),
                }))
              }
            >
              <option value="">Select Country</option>
              {countriesData?.result.map((country:any) => (
                <option key={country.id} value={country.id}>
                  {country.countryName}
                </option>
              ))}
            </select>

            <label htmlFor="checkbox">Is Active</label>
            <input
              className="form-check-input"
              type="checkbox"
              name="isActive"
              value={isChecked.toString()}
              // checked={stateInputs.isActive}
              // onChange={handlestateInput}
              checked={isChecked}
              onChange={handleOnChange}
            />

            <div className="row">
              <div className="col-6">
                <button
                  type="submit"
                  className="btn btn-success form-control mt-3"
                >
                  {id ? "Update" : "Create"}
                </button>
              </div>
              <div className="col-6">
                <a
                  onClick={() => navigate("/state/statelist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to State
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default StateUpsert;
