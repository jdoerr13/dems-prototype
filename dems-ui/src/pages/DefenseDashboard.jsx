import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useDashboardData from "../hooks/useDashboardData";
import toast from "react-hot-toast";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

function StatCard({ title, value, color, path }) {
  const card = (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col hover:shadow-lg cursor-pointer">
      <h3 className="text-gray-700 text-sm font-medium mb-2">{title}</h3>
      <span className={`px-3 py-1 rounded text-white font-bold text-lg ${color}`}>{value}</span>
    </div>
  );
  return path ? <Link to={path}>{card}</Link> : card;
}

export default function DefenseDashboard() {
  const { counts, cases, evidence, charts } = useDashboardData();
  const defenseCases = cases.filter((c) => !!c.defenseEmail);

  // Toasts for new data
  const lastDefense = useRef(0);
  const lastEvidence = useRef(0);
  useEffect(() => {
    if (defenseCases.length > lastDefense.current) {
      toast(`🛡️ ${defenseCases.length} case(s) assigned`);
    }
    if (evidence.length > lastEvidence.current) {
      toast.success("📂 New discovery evidence available");
    }
    lastDefense.current = defenseCases.length;
    lastEvidence.current = evidence.length;
  }, [defenseCases.length, evidence.length]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Defense — Dashboard</h1>
      <p className="text-gray-600">Discovery packets, delegation, and AI alerts.</p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Assigned Cases" value={defenseCases.length} color="bg-purple-600" path="/defense" />
        <StatCard title="Evidence Items" value={evidence.length} color="bg-blue-600" path="/defense" />
        <StatCard title="Pending Discovery" value={counts.submittedCases} color="bg-yellow-600" path="/defense" />
        <StatCard title="Delegation" value="Available" color="bg-gray-600" path="/delegation" />
        <StatCard title="Transparency Logs" value="-" color="bg-blue-800" path="/transparency-internal" />
      </div>

      {/* Cases */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-3">Cases with Discovery</h2>
        <ul className="divide-y text-sm">
          {defenseCases.map((c) => (
            <li key={c.caseId} className="py-2 flex justify-between items-center">
              <span><span className="font-medium">{c.caseId}</span> — {c.title}</span>
              <button className="text-xs px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">
                View Discovery
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* AI Alerts */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-3">AI Redaction Alerts</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={charts.aiTags.filter(t => ["face","license plate"].includes(t.name))}>
            <XAxis dataKey="name" /><YAxis /><Tooltip />
            <Bar dataKey="value" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
