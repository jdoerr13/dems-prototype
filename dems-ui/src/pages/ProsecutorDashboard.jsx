// src/pages/ProsecutorDashboard.jsx
import React, { useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import useDashboardData from "../hooks/useDashboardData";
import toast from "react-hot-toast";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  ShieldCheck,
  FileSpreadsheet,
  Link2,
  Lock,
  FileSearch,
} from "lucide-react";
import DiscoveryExport from "../components/DiscoveryExport";

// ------------------ StatCard ------------------
function StatCard({ title, value, subtitle, color, icon: Icon, path, locked }) {
  const content = (
    <div
      className={`bg-white rounded-xl shadow p-6 flex flex-col gap-1 transition ${
        locked ? "opacity-60 cursor-not-allowed" : "hover:shadow-lg cursor-pointer"
      }`}
      title={locked ? "Available in Phase II" : undefined}
    >
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-5 h-5 text-gray-500" />}
        <h3 className="text-gray-700 text-sm font-medium">{title}</h3>
      </div>
      <div className="flex items-end gap-2">
        <span className={`text-2xl font-bold text-white px-2 rounded ${color}`}>
          {value}
        </span>
        {subtitle && <span className="text-xs text-gray-500">{subtitle}</span>}
      </div>
    </div>
  );
  return path && !locked ? <Link to={path}>{content}</Link> : content;
}

// ------------------ Page ------------------
export default function ProsecutorDashboard() {
  const { counts, cases, evidence } = useDashboardData();
  const pending = cases.filter((c) => c.status === "Submitted");

  // Toast notifications
  const lastPending = useRef(0);
  const lastEvidence = useRef(0);
  useEffect(() => {
    if (pending.length > lastPending.current) {
      toast(`⚖️ ${pending.length} case(s) awaiting approval`);
    }
    if (evidence.length > lastEvidence.current) {
      toast.success("📂 New Evidence Uploaded");
    }
    lastPending.current = pending.length;
    lastEvidence.current = evidence.length;
  }, [pending.length, evidence.length]);

  // ---------------- Mock Data for Charts ----------------
  // Case outcomes trend by month
  const caseOutcomesByMonth = [
    { month: "May", Accepted: 12, Rejected: 3 },
    { month: "Jun", Accepted: 18, Rejected: 5 },
    { month: "Jul", Accepted: 14, Rejected: 4 },
    { month: "Aug", Accepted: 21, Rejected: 6 },
    { month: "Sep", Accepted: 19, Rejected: 7 },
  ];

  // AI flags distribution
  const aiAlerts = [
    { name: "Weapons", value: 14 },
    { name: "Faces", value: 22 },
    { name: "License Plates", value: 9 },
    { name: "Drug Paraphernalia", value: 6 },
    { name: "Alcohol", value: 4 },
  ];

  // ---------------- Render ----------------
  return (
    <section className="max-w-7xl mx-auto px-6 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Prosecutor — Dashboard
          </h1>
          <p className="text-gray-600">
            Approvals, discovery, evidence logs, and AI alerts.
          </p>
        </div>
        <div className="self-start flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          <ShieldCheck className="w-4 h-4" />
          CJIS / FedRAMP Compliant 
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Pending Approvals"
          value={pending.length}
          subtitle="Cases awaiting review"
          color="bg-yellow-600"
          icon={FileSpreadsheet}
          path="/prosecutor"
        />
        <StatCard
          title="Accepted Cases"
          value={counts.acceptedCases}
          subtitle="Total"
          color="bg-green-600"
          icon={FileSpreadsheet}
          path="/prosecutor"
        />
        <StatCard
          title="Discovery Packets"
          value={cases.filter((c) =>
            evidence.some((ev) => ev.caseId === c.caseId)
          ).length}
          subtitle="Ready for export"
          color="bg-blue-600"
          icon={FileSearch}
        />
        <StatCard
          title="Defense Assigned"
          value={counts.defenseAssigned}
          subtitle="Active"
          color="bg-purple-600"
          icon={Link2}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Case Outcomes Trend */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold mb-2">Case Outcomes Over Time</h2>
          <p className="text-sm text-gray-500 mb-4">
            Monthly trends of accepted vs rejected cases ( data).
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={caseOutcomesByMonth}>
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Accepted" fill="#16a34a" />
              <Bar dataKey="Rejected" fill="#dc2626" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* AI Alerts */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold mb-2">AI Flag Alerts</h2>
          <p className="text-sm text-gray-500 mb-4">
            AI-flagged categories across recent evidence.
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={aiAlerts}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Evidence Log Export */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-4">Evidence Log</h2>
        <p className="text-sm text-gray-500 mb-3">
          Generate a log of all evidence in this case. Filter by type or exclude
          subsets before export.
        </p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Export Evidence Log (CSV)
        </button>
      </div>

      {/* Recent Cases */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-4">Recent Cases</h2>
        <ul className="divide-y text-sm">
          {cases.slice(0, 8).map((c) => (
            <li
              key={c.caseId}
              className="py-3 flex justify-between items-center hover:bg-gray-50 px-2 rounded"
            >
              <span>
                <span className="font-medium">{c.caseId}</span> — {c.title}
              </span>
              <div className="flex gap-2">
                <span className="text-gray-500">{c.status}</span>
                <DiscoveryExport caseId={c.caseId} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Locked / Future Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Metadata Import"
          value="Locked"
          subtitle="Auto-import from Judicial DB"
          color="bg-gray-400"
          icon={Lock}
          locked
        />
        <StatCard
          title="Co-Defendant Linking"
          value="Locked"
          subtitle="Case relation tools"
          color="bg-gray-400"
          icon={Lock}
          locked
        />
        <StatCard
          title="Redaction Tools"
          value="Locked"
          subtitle="Blur faces & plates"
          color="bg-gray-400"
          icon={Lock}
          locked
        />
      </div>
    </section>
  );
}
