import { masterMenuconfig } from "./masterMenuconfig";

export const roleManagementConfig = [
  {
    name: "name",
    label: "Role",
    type: "text",
    required: true,
    placeholder: "Role",
  },
  {
    name: "permissions",
    label: "Permissions",
    type: "permissions",
    showInTable: false,
    options: masterMenuconfig,
  },
];
