import React, { useEffect, useState } from "react";

const PatientGenderChart = () => {
  const [stats, setStats] = useState({
    male: 0,
    female: 0,
    other: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/patients/stats/gender",
        );
        const data = await response.json();
        if (response.ok) {
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching gender stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="text-center p-4">Loading stats...</div>;

  const calculatePercentage = (count) => {
    return stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Total Patient</h3>
      <div className="text-sm text-gray-500 mb-4">
        Total Patients: {stats.total}
      </div>

      <div className="space-y-4">
        {/* Male */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-semibold text-gray-700">Male</span>
            <span className="text-gray-600">
              {stats.male} ({calculatePercentage(stats.male)}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${calculatePercentage(stats.male)}%` }}
            ></div>
          </div>
        </div>

        {/* Female */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-semibold text-gray-700">Female</span>
            <span className="text-gray-600">
              {stats.female} ({calculatePercentage(stats.female)}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-pink-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${calculatePercentage(stats.female)}%` }}
            ></div>
          </div>
        </div>

        {/* Other */}
        {stats.other > 0 && (
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-semibold text-gray-700">Other</span>
              <span className="text-gray-600">
                {stats.other} ({calculatePercentage(stats.other)}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-purple-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${calculatePercentage(stats.other)}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientGenderChart;
