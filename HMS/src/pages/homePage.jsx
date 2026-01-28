import React from "react";
import PatientGenderChart from "../components/Dashboard/PatientGenderChart";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-gray-50 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h1>
      <div className="w-full flex justify-center">
        <PatientGenderChart />
      </div>
    </div>
  );
};
export default HomePage;
