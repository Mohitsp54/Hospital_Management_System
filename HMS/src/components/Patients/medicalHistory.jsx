import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../../redux/slices/patientSlice";
import DynamicTable from "../table/dynamictable";
import { patientHistoryConfig } from "../../../config/patientHistoryConfig";

const MedicalHistory = () => {
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

  const tableColumns = patientHistoryConfig
    .filter((col) => col.showInTable !== false)
    .map((col) => {
      // Add mapping if needed, e.g. if field names in config differ from DB
      return col;
    });

  // We might not need Edit/Delete actions here as it's a history view, or maybe we do?
  // User asked for "similar table like viewPatients".
  // ViewPatients has Edit/Delete.
  // I'll leave onEdit/onDelete empty for now unless requested.

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
        // onEdit and onDelete not passed, so actions might not show or show no-op
      />
    </div>
  );
};
export default MedicalHistory;
