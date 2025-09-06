// src/pages/AdminConsoleDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import useDashboardData from "../hooks/useDashboardData";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import { saveAs } from "file-saver";

function exportAudits(audits) {
  const header = "id,actor,action,timestamp,ip\n";
  const rows = audits
    .map(
      (a) =>
        `${a.id},${a.actor},${a.action},${a.timestamp},${a.ip || ""}`
    )
    .join("\n");
  const blob = new Blob([header + rows], {
    type: "text/csv;charset=utf-8",
  });
  saveAs(blob, "audit-log.csv");
}

function StatCard({ title, value, color, path }) {
  const card = (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col hover:shadow-lg cursor-pointer">
      <h3 className="text-gray-700 text-sm font-medium mb-2">{title}</h3>
      <span
        className={`px-3 py-1 rounded text-white font-bold text-lg ${color}`}
      >
        {value}
      </span>
    </div>
  );
  return path ? <Link to={path}>{card}</Link> : card;
}

export default function AdminConsoleDashboard() {
  const { counts, charts, audits, notifications } = useDashboardData();
  const COLORS = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Admin — Dashboard
      </h1>
      <p className="text-gray-600">
        Oversight, audits, notifications, and AI analytics.
      </p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Cases"
          value="18334"
          color="bg-blue-600"
          path="/admin"
        />
        <StatCard
          title="Evidence Items"
          value={counts.evidenceItems}
          color="bg-green-600"
          path="/admin"
        />
        <StatCard
          title="Audit Logs"
          value={counts.auditsCount}
          color="bg-red-600"
          path="/advanced-audit"
        />
        <StatCard
          title="User Management"
          value={counts.notificationsCount}
          color="bg-indigo-600"
          path="/users"
        />
        <StatCard
          title="Advanced Audit"
          value="-"
          color="bg-teal-600"
          path="/advanced-audit"
        />
        <StatCard
          title="Transparency Logs"
          value="-"
          color="bg-blue-800"
          path="/transparency-internal"
        />
        <StatCard
          title="Analytics Dashboard"
          value="-"
          color="bg-indigo-600"
          path="/analytics"
        />
        <StatCard
          title="Cross-Agency Governance"
          value="-"
          color="bg-blue-700"
          path="/cross-agency"
        />
        <StatCard
          title="Archival"
          value="-"
          color="bg-gray-800"
          path="/archival"
        />
      </div>

      {/* Audit Export */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-3">Audit Log Export</h2>
        <button
          onClick={() => exportAudits(audits)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Download Audit Log (CSV)
        </button>
      </div>

      {/* AI Tag Analytics */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-3">AI Tag Analytics</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={charts.aiTags}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* System Metrics */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-3">System Metrics</h2>
        <ul className="text-sm space-y-2">
          <li>
            <strong>Storage:</strong> 350 TB (simulated)
          </li>
          <li>
            <strong>Annual Case Load:</strong> 9,000 cases/year
          </li>
          <li>
            <strong>Defense Attorneys:</strong> 650 registered
          </li>
        </ul>
      </div>

      {/* Cases by Agency */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-3">Cases by Agency</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={charts.casesByAgency}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {charts.casesByAgency.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Recent audits */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-3">Recent Audits</h2>
        <ul className="divide-y text-sm">
          {audits.slice(0, 8).map((a) => (
            <li key={a.id} className="py-2">
              <span className="font-medium">{a.actor}</span> — {a.action}
              <span className="float-right text-xs text-gray-400">
                {new Date(a.timestamp).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-3">Notifications</h2>
        <ul className="divide-y text-sm">
          {notifications.map((n) => (
            <li key={n.id} className="py-2">
              {n.message}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
