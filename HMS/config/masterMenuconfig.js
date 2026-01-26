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
        path: "/view-doctor",
        icon: "",
      },
      {
        name: "Doctor Schedules",
        path: "/doctor-schedules",
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
        path: "/book-appointment",
        icon: "",
      },
      {
        name: "View Appointment",
        path: "/view-appointment",
        icon: "",
      },
      {
        name: "Cancelled Appointment",
        path: "/cancelled-appointment",
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
        path: "/test-requests",
        icon: "",
      },
      {
        name: "Test Reports",
        path: "/test-reports",
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
        path: "/admit-patient",
        icon: "",
      },
      {
        name: "Bed / Ward Management",
        path: "/bed-ward-management",
        icon: "",
      },
      {
        name: "Discharge Summary",
        path: "/discharge-summary",
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
        path: "/medicine",
        icon: "",
      },
      {
        name: "Medicine Stock",
        path: "/medicine-stock",
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
        path: "/user-management",
        icon: "",
      },
      {
        name: "Role Management",
        path: "/role-management",
        icon: "",
      },
    ],
  },
];
