import React, { useState } from "react";
import { getAIInsights } from "../utils/apiClient";

export default function AIInsightsPanel() {
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState("");

  async function handleClick() {
    setLoading(true);
    const res = await getAIInsights({ readiness: 80, sessions: [{ type: "strength", score: 95 }] });
    setInsight(res.insights);
    setLoading(false);
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm">
      <h2 className="font-bold text-xl mb-3 text-purple-700">AI Insights</h2>
      <button
        onClick={handleClick}
        className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700"
      >
        {loading ? "Analyzing…" : "Generate Insights"}
      </button>
      {insight && <p className="mt-4 text-gray-700 whitespace-pre-wrap">{insight}</p>}
    </div>
  );
}
