import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SubHeader from "../components/Header/subHeader";
import UserManagement from "../components/admin/userManagement";
import RoleManagement from "../components/admin/roleManagement";
import DynamicForm from "../components/forms/dynamicform";
import { userManagementConfig } from "../../config/userManagementConfig";
import { roleManagementConfig } from "../../config/roleManagementConfig";
import { addUser, updateUser, deleteUser } from "../redux/slices/userSlice";
import {
  addRole,
  updateRole,
  deleteRole,
  fetchRoles,
} from "../redux/slices/roleSlice";

const AdminPage = () => {
  const location = useLocation();
  const path = location.pathname;
  const dispatch = useDispatch();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const { roles } = useSelector((state) => state.role);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  // Determine active config and action based on path
  // Use useMemo to avoid recreating config on every render, but ensure it updates when roles change
  const activeConfig = useMemo(() => {
    if (path.includes("user-management")) {
      // Clone config to avoid mutating original
      const config = userManagementConfig.map((field) => ({ ...field }));

      // Update role options dynamically
      const roleField = config.find((f) => f.name === "role");
      if (roleField) {
        roleField.options = roles.map((role) => ({
          value: role.name,
          label: role.name,
        }));
      }
      return config;
    } else if (path.includes("role-management")) {
      return roleManagementConfig;
    }
    return null;
  }, [path, roles]);

  let activeTitle = "";
  if (path.includes("user-management")) {
    activeTitle = editingItem ? "Edit User" : "Add New User";
  } else if (path.includes("role-management")) {
    activeTitle = editingItem ? "Edit Role" : "Add New Role";
  }

  const handleEdit = (item) => {
    let formData = { ...item };
    if (path.includes("user-management")) {
      formData = {
        ...formData,
        password: "",
        userId: item._id,
      };
    } else if (path.includes("role-management")) {
      // Role specific mapping if needed
    }
    setEditingItem(formData);
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    if (path.includes("user-management")) {
      if (window.confirm("Are you sure you want to delete this user?")) {
        dispatch(deleteUser(id));
      }
    } else if (path.includes("role-management")) {
      if (window.confirm("Are you sure you want to delete this role?")) {
        dispatch(deleteRole(id));
      }
    }
  };

  const handleAddClick = () => {
    if (activeConfig) {
      setEditingItem(null);
      setShowAddForm(true);
    } else {
      console.log("Add not implemented for this page");
    }
  };

  const handleFormSubmit = async (data) => {
    if (path.includes("user-management")) {
      let result;
      if (editingItem) {
        result = await dispatch(
          updateUser({ id: editingItem._id, userData: data }),
        );
        if (updateUser.fulfilled.match(result)) {
          alert("User updated successfully!");
          setShowAddForm(false);
          setEditingItem(null);
        } else {
          alert(`Error: ${result.payload}`);
        }
      } else {
        result = await dispatch(addUser(data));
        if (addUser.fulfilled.match(result)) {
          alert("User added successfully!");
          setShowAddForm(false);
        } else {
          alert(`Error: ${result.payload}`);
        }
      }
    } else if (path.includes("role-management")) {
      let result;
      if (editingItem) {
        result = await dispatch(
          updateRole({ id: editingItem._id, roleData: data }),
        );
        if (updateRole.fulfilled.match(result)) {
          alert("Role updated successfully!");
          setShowAddForm(false);
          setEditingItem(null);
        } else {
          alert(`Error: ${result.payload}`);
        }
      } else {
        result = await dispatch(addRole(data));
        if (addRole.fulfilled.match(result)) {
          alert("Role added successfully!");
          setShowAddForm(false);
        } else {
          alert(`Error: ${result.payload}`);
        }
      }
    }
  };

  let content;
  if (path.includes("user-management")) {
    content = <UserManagement onEdit={handleEdit} onDelete={handleDelete} />;
  } else if (path.includes("role-management")) {
    content = <RoleManagement onEdit={handleEdit} onDelete={handleDelete} />;
  } else {
    content = (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select an option from the menu
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full relative">
      <SubHeader
        onAddClick={handleAddClick}
        title={path.includes("role-management") ? "Roles" : "Users"}
      />
      <div className="flex-1 overflow-hidden">{content}</div>
      {showAddForm && activeConfig && (
        <DynamicForm
          title={activeTitle}
          config={activeConfig}
          initialData={editingItem || {}}
          onClose={() => {
            setShowAddForm(false);
            setEditingItem(null);
          }}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default AdminPage;
