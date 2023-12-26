import React, { useEffect, useState } from "react";
import {
  useCreateCountryMutation,
  useGetCountryByIdQuery,
  useUpdateCountryMutation,
} from "../../Apis/countryApi";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Componets/Page/Common"; 
import { apiResponse } from "../../Interfaces";

const countryData: { countryName: string } = {
  countryName: "",
};

function CountryUpsert() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [countryInputs, setCountryInputs] = useState(countryData);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createCountry] = useCreateCountryMutation();
  const [updateCountry] = useUpdateCountryMutation();
  const { data } = useGetCountryByIdQuery(id);

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        countryName: data.result.countryName,
        isActive: data.result.isActive,
      };
      setCountryInputs(tempData);
      setIsChecked(tempData.isActive);
    }
  }, [data]);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    setCountryInputs((prevData) => ({
      ...prevData,
      isActive: !isChecked,
    }));
  };

  const handleCountryInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, countryInputs);
    setCountryInputs(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("CountryName", countryInputs.countryName);
    formData.append("IsActive", isChecked.toString());

    try {
      let response: apiResponse;

      if (id) {
        formData.append("Id", id);
        response = await updateCountry({ data: formData, id });

        if (response != null && response.data?.isSuccess) {
          toastNotify("Country updated successfully", "success");
          navigate("/country/countrylist");
          setLoading(true);
        } else {
          toastNotify("Invalid Country Data", "error");
        }
      } else {
        response = await createCountry(formData);

        if (response != null && response.data?.isSuccess) {
          toastNotify("Country created successfully", "success");
          navigate("/country/countrylist");
        } else {
          toastNotify("Invalid Country Data", "error");
        }
      }
    } catch (error) {
      console.error("API Error:", error);
      toastNotify("Error occurred", "error");
    }
    setLoading(false);
  };
  //   try {
  //     let response: apiResponse;

  //     if (id) {
  //       formData.append("Id", id);
  //       response = await updateCountry({ data: formData, id });

  //       if (response != null && response.data?.isSuccess) {
  //         toastNotify("Country updated successfully", "success");
  //         navigate("/country/countrylist");
  //       } else {
  //         if (response.data && response.data.errorMessages != null) {
  //           toastNotify(response.data.errorMessages[0], "error");
  //         } else {
  //           toastNotify("An error occurred", "error");
  //         }
  //       }
  //     } else {
  //       response = await createCountry(formData);

  //       if (response != null && response.data?.isSuccess) {
  //         toastNotify("Country created successfully", "success");
  //         navigate("/country/countrylist");
  //       } else {
  //         if (response.data && response.data.errorMessages != null) {
  //           toastNotify(response.data.errorMessages[0], "error");
  //         } else {
  //           toastNotify("An error occurred", "error");
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.error("API Error:", error);
  //     toastNotify("An error occurred", "error");
  //   }

  //   setLoading(false);
  // };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className="px-2 text-success">
        {id ? "Edit Country" : "Add Country"}
      </h3>
      <form method="post" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="countryName"
              value={countryInputs.countryName}
              onChange={handleCountryInput}
            />

            <label htmlFor="checkbox">Is Active</label>
            <input
              className="form-check-input"
              type="checkbox"
              name="isActive"
              value={isChecked.toString()}
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
                  onClick={() => navigate("/country/countrylist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to Country
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CountryUpsert;
