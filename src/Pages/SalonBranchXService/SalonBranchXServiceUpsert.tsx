import React, { useEffect, useState } from "react";
import { useGetSalonBranchByIdQuery } from "../../Apis/salonBranchApi";
import { useGetAllFirstServicesQuery } from "../../Apis/firstServiceApi";
import { useGetSalonBranchXServiceByIdQuery,useGetSalonBranchXServiceBySalonBranchIdQuery, useCreateSalonBranchXServiceMutation } from "../../Apis/salonBranchXServiceApi";
import { toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { firstServiceModel } from "../../Interfaces";

function SalonBranchXServiceUpsert() {
  const { salonBranchId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { data: salonBranchData } = useGetSalonBranchByIdQuery(salonBranchId);
  const { data: serviceData } = useGetAllFirstServicesQuery(null);
  const { data: salonBranchXServiceData } = useGetSalonBranchXServiceBySalonBranchIdQuery(salonBranchId);
  const [isCheckedMap, setIsCheckedMap] = useState<Record<string, boolean>>({});
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [createSalonBranchXService] = useCreateSalonBranchXServiceMutation();


  useEffect(() => {
    if (serviceData && salonBranchXServiceData) {
      const initialCheckedMap: Record<string, boolean> = {};
      salonBranchXServiceData?.result.forEach((item: any) => {
        initialCheckedMap[item.firstServiceId] = true;
      });
      setIsCheckedMap(initialCheckedMap);
      setSelectedServiceIds(salonBranchXServiceData.result.map((item: any) => item.firstServiceId) || []);
    }
  }, [serviceData, salonBranchXServiceData]);

  const handleOnChange = (firstServiceId: string) => {
    debugger
    setIsCheckedMap((prevMap) => ({
      ...prevMap,
      [firstServiceId]: !prevMap[firstServiceId],
    }));
    
    setSelectedServiceIds((prevIds) => {
      if (prevIds.includes(firstServiceId)) {
        return prevIds.filter((id) => id !== firstServiceId);
      } else {
        return [...prevIds, firstServiceId];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    
    if (salonBranchId) {
      formData.append("SalonBranchId", salonBranchId);
      selectedServiceIds.forEach((firstServiceId) => {
        formData.append("SelectedServiceIds", firstServiceId);
      });

      const response = await createSalonBranchXService(formData);
      if (response) {
        toastNotify("Service updated successfully", "success");
        setLoading(false);
        navigate("/salonBranch/salonBranchlist");
      }
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      <h3 className="px-2 text-success">Select Service Of {salonBranchData?.result.branchName} SalonBranch</h3>
      <form method="post" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
  
            <div className="form-group">
              <label>Select Service:</label>
              {serviceData?.result.map((firstService: any) => (
                <div key={firstService.id} className="form-check">
                  <input
                    type="checkbox"
                    name="SelectedServiceIds"
                    className="form-check-input"
                    id={`service-${firstService.id}`}
                    value={firstService.id}
                    checked={isCheckedMap[firstService.id] || false}
                    onChange={() => handleOnChange(firstService.id)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`service-${firstService.id}`}
                  >
                    {firstService.firstServiceName}
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

export default SalonBranchXServiceUpsert;


