import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../../redux/slices/patientSlice";
import DynamicTable from "../table/dynamictable";
import { patientHistoryConfig } from "../../../config/patientHistoryConfig";

import { IoDocumentTextOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

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
      if (col.name === "medicalHistory") {
        return {
          ...col,
          render: (row) => (
            <Link
              to={`/patients/history/${row._id}`}
              className="text-blue-600 hover:text-blue-800"
              title="View History"
            >
              <IoDocumentTextOutline size={24} />
            </Link>
          ),
        };
      }
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
        // onEdit and onDelete not passed, so actions might not show or show no-op
      />
    </div>
  );
};
export default MedicalHistory;
