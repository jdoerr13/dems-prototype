import React from "react";
import { Link } from "react-router-dom";
import useDashboardData from "../hooks/useDashboardData";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

function StatCard({ title, value, color, path }) {
  const card = (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start hover:shadow-lg cursor-pointer">
      <h3 className="text-gray-700 text-sm font-medium mb-2">{title}</h3>
      <span className={`px-3 py-1 rounded text-white font-bold text-lg ${color}`}>
        {value}
      </span>
    </div>
  );
  return path ? <Link to={path}>{card}</Link> : card;
}

export default function LEADashboard() {
  const { counts, charts, evidence, audits } = useDashboardData();
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"];

  return (
    <section className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">LEA — Dashboard</h1>
      <p className="text-gray-600">Submissions, uploads, and custody tracking.</p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Cases" value={counts.totalCases} color="bg-blue-600" path="/lea" />
        <StatCard title="Evidence Uploaded" value={counts.evidenceItems} color="bg-green-600" path="/bulkupload" />
        <StatCard title="Submitted Reports" value={counts.submittedCases} color="bg-yellow-600" path="/lea" />
        <StatCard title="Chain of Custody" value={counts.auditsCount} color="bg-indigo-600" path="/chain" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold mb-3">Cases by Status</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={charts.casesByStatus}>
              <XAxis dataKey="name" /><YAxis /><Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold mb-3">Evidence by Type</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={charts.evidenceByType} dataKey="value" nameKey="name" outerRadius={80} label>
                {charts.evidenceByType.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Lists */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-3">Recent Evidence</h2>
        <ul className="divide-y text-sm">
          {evidence.slice(0, 8).map(ev => (
            <li key={ev.id} className="py-2 flex justify-between">
              <span>{ev.filename}</span>
              <span className="text-gray-500">{ev.type}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-3">Recent Custody Events</h2>
        <ul className="divide-y text-sm">
          {audits.slice(0, 8).map(a => (
            <li key={a.id} className="py-2">
              <span className="font-medium">{a.actor}</span> — {a.action}
              <span className="float-right text-xs text-gray-400">
                {new Date(a.timestamp).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
