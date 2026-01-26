import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../../redux/slices/patientSlice";
import DynamicTable from "../table/dynamictable";
import { patientFormConfig } from "../../../config/patientFormConfig";

const ViewPatients = ({ onEdit, onDelete }) => {
  const dispatch = useDispatch();
  const { patients, total, page, limit, isLoading } = useSelector(
    (state) => state.patient,
  );

  useEffect(() => {
    dispatch(fetchPatients({ page: 1, limit }));
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    dispatch(fetchPatients({ page: newPage, limit }));
  };

  const handleLimitChange = (newLimit) => {
    dispatch(fetchPatients({ page: 1, limit: newLimit }));
  };

  const tableColumns = patientFormConfig
    .filter((col) => col.showInTable !== false)
    .map((col) => {
      if (col.name === "mobileString") return { ...col, name: "mobileNumber" };
      return col;
    });

  return (
    <div className="h-full flex flex-col">
      {isLoading && (
        <div className="text-center p-2 text-blue-500">Loading...</div>
      )}
      <DynamicTable
        columns={tableColumns}
        data={patients}
        totalItems={total}
        currentPage={page}
        itemsPerPage={limit}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};
export default ViewPatients;
