export const masterMenuconfig = [
  {
    name: "Dashboard",
    path: "/",
    icon: "",
  },
  {
    name: "Patients",
    path: "/patients",
    icon: "",
    Children: [
      {
        name: "View Patient",
        path: "/patients/view-patient",
        icon: "",
      },
      {
        name: "Patient Medical History",
        path: "/patients/patient-medical-history",
        icon: "",
      },
    ],
  },
  {
    name: "Doctors",
    path: "/doctors",
    icon: "",
    Children: [
      {
        name: "View Doctor",
        path: "/doctors/view-doctor",
        icon: "",
      },
      {
        name: "Doctor Schedules",
        path: "/doctors/doctor-schedules",
        icon: "",
      },
    ],
  },
  {
    name: "Appointments",
    path: "/appointments",
    icon: "",
    Children: [
      {
        name: "Book Appointment",
        path: "/appointments/book-appointment",
        icon: "",
      },
      {
        name: "View Appointment",
        path: "/appointments/view-appointment",
        icon: "",
      },
      {
        name: "Cancelled Appointment",
        path: "/appointments/cancelled-appointment",
        icon: "",
      },
    ],
  },
  {
    name: "Laboratory",
    path: "/laboratory",
    icon: "",
    Children: [
      {
        name: "Test Requests",
        path: "/laboratory/test-requests",
        icon: "",
      },
      {
        name: "Test Reports",
        path: "/laboratory/test-reports",
        icon: "",
      },
    ],
  },
  {
    name: "IPD Management",
    path: "/ipd-management",
    icon: "",
    Children: [
      {
        name: "Admit Patient",
        path: "/ipd-management/admit-patient",
        icon: "",
      },
      {
        name: "Bed / Ward Management",
        path: "/ipd-management/bed-ward-management",
        icon: "",
      },
      {
        name: "Discharge Summary",
        path: "/ipd-management/discharge-summary",
        icon: "",
      },
    ],
  },
  {
    name: "Pharmacy",
    path: "/pharmacy",
    icon: "",
    Children: [
      {
        name: "Medicine",
        path: "/pharmacy/medicine",
        icon: "",
      },
      {
        name: "Medicine Stock",
        path: "/pharmacy/medicine-stock",
        icon: "",
      },
    ],
  },
  {
    name: "Admin",
    path: "/admin",
    icon: "",
    Children: [
      {
        name: "User Management",
        path: "/admin/user-management",
        icon: "",
      },
      {
        name: "Role Management",
        path: "/admin/role-management",
        icon: "",
      },
    ],
  },
];
