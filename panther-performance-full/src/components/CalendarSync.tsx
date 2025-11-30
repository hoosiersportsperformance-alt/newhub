import React, { useEffect, useState } from "react";
import { getParkTudorEvents } from "../utils/apiClient";

export default function CalendarSync() {
  const [events, setEvents] = useState<any[]>([]);
  useEffect(() => {
    getParkTudorEvents().then(data => setEvents(data.events)).catch(console.error);
  }, []);
  return (
    <div className="bg-gray-50 p-4 rounded-2xl border shadow-sm">
      <h2 className="font-bold text-xl mb-3 text-slate-900">Park Tudor Athletics</h2>
      <ul className="space-y-2 text-sm">
        {events.map((e, i) => (
          <li key={i} className="border-b pb-2">
            <strong>{e.sport}</strong> — {e.date} {e.time && `at ${e.time}`} <br />
            {e.opponent && <span>vs {e.opponent}</span>} {e.location && <span>@ {e.location}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
