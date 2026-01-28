import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "../../redux/slices/roleSlice";
import DynamicTable from "../table/dynamictable";
import { roleManagementConfig } from "../../../config/roleManagementConfig";

const RoleManagement = ({ onEdit, onDelete }) => {
  const dispatch = useDispatch();
  const { roles, loading } = useSelector((state) => state.role);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const tableData = roles.map((role) => ({
    ...role,
    userId: role._id,
  }));

  return (
    <div className="h-full flex flex-col">
      {loading && (
        <div className="text-center p-2 text-blue-500">Loading...</div>
      )}
      <div className="flex-1 overflow-hidden">
        <DynamicTable
          columns={roleManagementConfig}
          data={tableData}
          totalItems={tableData.length}
          currentPage={1}
          itemsPerPage={10}
          onPageChange={() => {}}
          onLimitChange={() => {}}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};

export default RoleManagement;
