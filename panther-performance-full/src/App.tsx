import React from "react";
import OutputDashboard from "./components/OutputDashboard";
import CalendarSync from "./components/CalendarSync";
import AIInsightsPanel from "./components/AIInsightsPanel";

export default function App() {
  return (
    <main className="min-h-screen bg-gray-100 p-6 space-y-6">
      <h1 className="text-3xl font-extrabold text-center text-red-700 mb-6">
        Panther Performance Dashboard
      </h1>
      <div className="grid md:grid-cols-2 gap-6">
        <OutputDashboard />
        <CalendarSync />
      </div>
      <AIInsightsPanel />
    </main>
  );
}
