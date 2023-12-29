import React, { useEffect, useState } from "react";
import { useGetSalonBranchByIdQuery } from "../../Apis/salonBranchApi";
import { useGetAllPaymentsQuery } from "../../Apis/paymentApi";
import { useGetSalonBranchXPaymentByIdQuery,useGetSalonBranchXPaymentBySalonBranchIdQuery, useCreateSalonBranchXPaymentMutation } from "../../Apis/salonBranchXPaymentApi";
import { toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";

function SalonBranchXPaymentUpsert() {
  const { salonBranchId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { data: salonBranchData } = useGetSalonBranchByIdQuery(salonBranchId);
  const { data: paymentData } = useGetAllPaymentsQuery(null);
  const { data: salonBranchXPaymentData } = useGetSalonBranchXPaymentBySalonBranchIdQuery(salonBranchId);
  const [isCheckedMap, setIsCheckedMap] = useState<Record<string, boolean>>({});
  const [selectedPaymentIds, setSelectedPaymentIds] = useState<string[]>([]);
  const [createSalonBranchXPayment] = useCreateSalonBranchXPaymentMutation();


  useEffect(() => {
    if (paymentData && salonBranchXPaymentData) {
      const initialCheckedMap: Record<string, boolean> = {};
      salonBranchXPaymentData?.result.forEach((item: any) => {
        initialCheckedMap[item.paymentId] = true;
      });
      setIsCheckedMap(initialCheckedMap);
      setSelectedPaymentIds(salonBranchXPaymentData.result.map((item: any) => item.paymentId) || []);
    }
  }, [paymentData, salonBranchXPaymentData]);

  const handleOnChange = (paymentId: string) => {
    debugger
    setIsCheckedMap((prevMap) => ({
      ...prevMap,
      [paymentId]: !prevMap[paymentId],
    }));
    
    setSelectedPaymentIds((prevIds) => {
      if (prevIds.includes(paymentId)) {
        return prevIds.filter((id) => id !== paymentId);
      } else {
        return [...prevIds, paymentId];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    
    if (salonBranchId) {
      formData.append("SalonBranchId", salonBranchId);
      selectedPaymentIds.forEach((paymentId) => {
        formData.append("SelectedPaymentIds", paymentId);
      });

      const response = await createSalonBranchXPayment(formData);
      if (response) {
        toastNotify("Payment updated successfully", "success");
        setLoading(false);
        navigate("/salonBranch/salonBranchlist");
      }
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      <h3 className="px-2 text-success">Select Payment Of {salonBranchData?.result.branchName} SalonBranch</h3>
      <form method="post" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
  
            <div className="form-group">
              <label>Select Payment:</label>
              {paymentData?.result.map((payment: any) => (
                <div key={payment.id} className="form-check">
                  <input
                    type="checkbox"
                    name="SelectedPaymentIds"
                    className="form-check-input"
                    id={`payment-${payment.id}`}
                    value={payment.id}
                    checked={isCheckedMap[payment.id] || false}
                    onChange={() => handleOnChange(payment.id)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`payment-${payment.id}`}
                  >
                    {payment.paymentName}
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

export default SalonBranchXPaymentUpsert;


