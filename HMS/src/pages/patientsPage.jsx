import { useLocation } from "react-router-dom";
import SubHeader from "../components/Header/subHeader";
import RegisterPatients from "../components/Patients/registerPatients";
import ViewPatients from "../components/Patients/viewPatients";
import MedicalHistory from "../components/Patients/medicalHistory";

const PatientsPage = () => {
  const location = useLocation();
  const path = location.pathname;

  let content;
  if (path.includes("register-patient")) {
    content = <RegisterPatients />;
  } else if (path.includes("view-patient")) {
    content = <ViewPatients />;
  } else if (path.includes("patient-medical-history")) {
    content = <MedicalHistory />;
  } else {
    content = (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select an option from the menu
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full">
      <SubHeader />
      <div className="flex-1 p-4 overflow-auto">{content}</div>
    </div>
  );
};
export default PatientsPage;
