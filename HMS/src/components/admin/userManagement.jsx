import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/slices/userSlice";
import DynamicTable from "../table/dynamictable";
import { userManagementConfig } from "../../../config/userManagementConfig";

const UserManagement = ({ onEdit, onDelete }) => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const tableData = users.map((user) => ({
    ...user,
    userId: user._id,
  }));

  return (
    <div className="h-full flex flex-col">
      {loading && (
        <div className="text-center p-2 text-blue-500">Loading...</div>
      )}
      <div className="flex-1 overflow-hidden">
        <DynamicTable
          columns={userManagementConfig}
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

export default UserManagement;
