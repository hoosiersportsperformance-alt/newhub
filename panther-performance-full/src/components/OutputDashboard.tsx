import React, { useEffect, useState } from "react";
import { getOutputData } from "../utils/apiClient";

export default function OutputDashboard() {
  const [athletes, setAthletes] = useState<any[]>([]);
  const [measurements, setMeasurements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOutputData()
      .then((data) => {
        setAthletes(data.athletes || []);
        setMeasurements(data.measurements || []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading Output Sports data...</div>;

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm">
      <h2 className="font-bold text-xl mb-3 text-red-600">Output Sports Live Data</h2>
      <h3 className="font-semibold mb-2">Athletes</h3>
      <ul className="space-y-1 text-sm">
        {athletes.map((a) => (
          <li key={a.id} className="border-b pb-1">
            <strong>{a.fullName || a.name}</strong> <br />
            DOB: {a.dateOfBirth ? new Date(a.dateOfBirth).toLocaleDateString() : "N/A"}
          </li>
        ))}
      </ul>

      <h3 className="font-semibold mt-4 mb-2">Recent Exercise Measurements</h3>
      <ul className="space-y-2 text-sm">
        {measurements.map((m) => (
          <li key={m.id} className="border-b pb-2">
            <strong>{m.exerciseId}</strong> ({m.exerciseCategory}) <br />
            Athlete: {m.athleteFullName || `${m.athleteFirstName} ${m.athleteLastName}`} <br />
            Date: {m.completedDate ? new Date(m.completedDate).toLocaleDateString() : "N/A"} <br />
            {m.metrics && m.metrics.length > 0 && (
              <span>
                Metric: {m.metrics[0].field} — {m.metrics[0].value}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
