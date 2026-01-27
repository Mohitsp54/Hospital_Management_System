import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoArrowBack } from "react-icons/io5";

const PatientMedicalHistoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { patients } = useSelector((state) => state.patient);
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    if (patients && patients.length > 0) {
      const found = patients.find((p) => p._id === id);
      setPatient(found);
    }
  }, [id, patients]);

  if (!patient) {
    return (
      <div className="p-4 text-center">
        <p>Loading or Patient not found...</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-blue-500 hover:underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full overflow-auto">
      <div className="flex items-center gap-4 mb-6 border-b pb-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <IoArrowBack size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          Medical History: {patient.name}
        </h1>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded border">
            <span className="font-semibold text-gray-600 block">
              Patient ID
            </span>
            <span className="text-lg">{patient.patientId}</span>
          </div>
          <div className="p-4 bg-gray-50 rounded border">
            <span className="font-semibold text-gray-600 block">
              Blood Group
            </span>
            <span className="text-lg">{patient.bloodGroup}</span>
          </div>
          <div className="p-4 bg-gray-50 rounded border">
            <span className="font-semibold text-gray-600 block">Age/DOB</span>
            <span className="text-lg">
              {new Date(patient.dob).toLocaleDateString()}
            </span>
          </div>
          <div className="p-4 bg-gray-50 rounded border">
            <span className="font-semibold text-gray-600 block">Gender</span>
            <span className="text-lg">{patient.gender}</span>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Medical Issues
          </h2>
          <div className="p-4 bg-red-50 rounded border border-red-100 min-h-[100px]">
            {patient.medicalIssues || "No medical issues recorded."}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Detailed History
          </h2>
          <div className="p-4 bg-blue-50 rounded border border-blue-100 min-h-[200px] whitespace-pre-wrap">
            {patient.medicalHistory || "No detailed history recorded."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientMedicalHistoryDetail;
