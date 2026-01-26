import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SubHeader from "../components/Header/subHeader";
import ViewPatients from "../components/Patients/viewPatients";
import MedicalHistory from "../components/Patients/medicalHistory";
import DynamicForm from "../components/forms/dynamicform";
import { patientFormConfig } from "../../config/patientFormConfig";
import {
  addPatient,
  fetchPatients,
  updatePatient,
  deletePatient,
  reset,
} from "../redux/slices/patientSlice";

const PatientsPage = () => {
  const location = useLocation();
  const path = location.pathname;
  const dispatch = useDispatch();
  const [showAddPatientForm, setShowAddPatientForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);

  const { isAddSuccess, isUpdateSuccess, isDeleteSuccess, isError, message } =
    useSelector((state) => state.patient);

  useEffect(() => {
    if (isAddSuccess) {
      setShowAddPatientForm(false);
      dispatch(reset());
      alert("Patient added successfully!");
      dispatch(fetchPatients({ page: 1, limit: 10 }));
    }

    if (isUpdateSuccess) {
      setShowAddPatientForm(false);
      setEditingPatient(null);
      dispatch(reset());
      alert("Patient updated successfully!");
      dispatch(fetchPatients({ page: 1, limit: 10 }));
    }

    if (isDeleteSuccess) {
      dispatch(reset());
      alert("Patient deleted successfully!");
      dispatch(fetchPatients({ page: 1, limit: 10 }));
    }

    if (isError) {
      alert(`Error: ${message}`);
      dispatch(reset());
    }
  }, [
    isAddSuccess,
    isUpdateSuccess,
    isDeleteSuccess,
    isError,
    message,
    dispatch,
  ]);

  const handleEdit = (patient) => {
    const formPatient = {
      ...patient,
      mobileString: patient.mobileNumber, // Map DB field to Form field
      dob: patient.dob ? new Date(patient.dob).toISOString().split("T")[0] : "", // Format Date
    };
    setEditingPatient(formPatient);
    setShowAddPatientForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      dispatch(deletePatient(id));
    }
  };

  let content;
  if (path.includes("view-patient")) {
    content = <ViewPatients onEdit={handleEdit} onDelete={handleDelete} />;
  } else if (path.includes("patient-medical-history")) {
    content = <MedicalHistory />;
  } else {
    content = (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select an option from the menu
      </div>
    );
  }

  const handleFormSubmit = (data) => {
    if (editingPatient) {
      dispatch(updatePatient({ id: editingPatient._id, patientData: data }));
    } else {
      dispatch(addPatient(data));
    }
  };

  return (
    <div className="flex flex-col h-full w-full relative">
      <SubHeader
        onAddClick={() => {
          setEditingPatient(null);
          setShowAddPatientForm(true);
        }}
      />
      <div className="flex-1 overflow-hidden">{content}</div>
      {showAddPatientForm && (
        <DynamicForm
          title={editingPatient ? "Edit Patient" : "Add New Patient"}
          config={patientFormConfig}
          initialData={editingPatient || {}}
          onClose={() => {
            setShowAddPatientForm(false);
            setEditingPatient(null);
          }}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};
export default PatientsPage;
