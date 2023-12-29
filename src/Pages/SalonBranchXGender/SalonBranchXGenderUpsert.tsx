import React, { useEffect, useState } from "react";
import { useGetSalonBranchByIdQuery } from "../../Apis/salonBranchApi";
import { useGetAllGendersQuery } from "../../Apis/GenderApi";
import { useGetSalonBranchXGenderByIdQuery,useGetSalonBranchXGenderBySalonBranchIdQuery, useCreateSalonBranchXGenderMutation } from "../../Apis/salonBranchXGenderApi";
import { toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";

function SalonBranchXGenderUpsert() {
  const { salonBranchId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { data: salonBranchData } = useGetSalonBranchByIdQuery(salonBranchId);
  const { data: genderData } = useGetAllGendersQuery(null);
  const { data: salonBranchXGenderData } = useGetSalonBranchXGenderBySalonBranchIdQuery(salonBranchId);
  const [isCheckedMap, setIsCheckedMap] = useState<Record<string, boolean>>({});
  const [selectedGenderIds, setSelectedGenderIds] = useState<string[]>([]);
  const [createSalonBranchXGender] = useCreateSalonBranchXGenderMutation();


  useEffect(() => {
    if (genderData && salonBranchXGenderData) {
      const initialCheckedMap: Record<string, boolean> = {};
      salonBranchXGenderData?.result.forEach((item: any) => {
        initialCheckedMap[item.genderId] = true;
      });
      setIsCheckedMap(initialCheckedMap);
      setSelectedGenderIds(salonBranchXGenderData.result.map((item: any) => item.genderId) || []);
    }
  }, [genderData, salonBranchXGenderData]);

  const handleOnChange = (genderId: string) => {
    debugger
    setIsCheckedMap((prevMap) => ({
      ...prevMap,
      [genderId]: !prevMap[genderId],
    }));
    
    setSelectedGenderIds((prevIds) => {
      if (prevIds.includes(genderId)) {
        return prevIds.filter((id) => id !== genderId);
      } else {
        return [...prevIds, genderId];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    
    if (salonBranchId) {
      formData.append("SalonBranchId", salonBranchId);
      selectedGenderIds.forEach((genderId) => {
        formData.append("SelectedGenderIds", genderId);
      });

      const response = await createSalonBranchXGender(formData);
      if (response) {
        toastNotify("Gender updated successfully", "success");
        setLoading(false);
        navigate("/salonBranch/salonBranchlist");
      }
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      <h3 className="px-2 text-success">Select Gender Of {salonBranchData?.result.branchName} SalonBranch</h3>
      <form method="post" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
  
            <div className="form-group">
              <label>Select Gender:</label>
              {genderData?.result.map((gender: any) => (
                <div key={gender.id} className="form-check">
                  <input
                    type="checkbox"
                    name="SelectedGenderIds"
                    className="form-check-input"
                    id={`gender-${gender.id}`}
                    value={gender.id}
                    checked={isCheckedMap[gender.id] || false}
                    onChange={() => handleOnChange(gender.id)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`gender-${gender.id}`}
                  >
                    {gender.genderType}
                  </label>
                </div>
              ))}
            </div>

            <div className="row">
              <div className="col-6">
                <button
                  type="submit"
                  className="btn btn-success form-control mt-3"
                >
                  Save
                </button>
              </div>
              <div className="col-6">
                <button
                  type="button"
                  onClick={() => navigate("/salonBranch/salonBranchlist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to SalonBranchList
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SalonBranchXGenderUpsert;


