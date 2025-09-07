// src/pages/LEADashboard.jsx
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  LabelList,
} from "recharts";
import {
  ShieldCheck,
  FolderPlus,
  FileLock2,
  Lock,
  UserCircle2,
} from "lucide-react";
import useDashboardData from "../hooks/useDashboardData";

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

export default function LEADashboard() {
  const { counts, charts, audits, evidence, cases } = useDashboardData();

  // ---------- Utilities ----------
  const fmtDate = (d) =>
    new Date(d).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  const daysBack = (n) => {
    const d = new Date();
    d.setDate(d.getDate() - n);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  // ---------- KPIs ----------
  const kpis = useMemo(() => {
    const startOfWeek = daysBack(7);
    const casesSubmittedWeek = audits.filter(
      (a) => a.action === "CREATE_CASE" && new Date(a.timestamp) >= startOfWeek
    ).length;

    const custodyEvents = audits.length;
    const activeCases = cases.filter(
      (c) => c.status === "Submitted" || c.status === "Accepted"
    ).length;

    return {
      casesSubmittedWeek,
      activeCases,
      evidenceCount: counts.evidenceItems,
      custodyEvents,
    };
  }, [audits, cases, counts.evidenceItems]);

  // ---------- Charts ----------
  const uploadsOverTime = useMemo(() => {
    const map = new Map();
    for (let i = 13; i >= 0; i--) {
      const d = daysBack(i);
      map.set(d.toDateString(), { date: fmtDate(d), uploads: 0 });
    }
    audits.forEach((a) => {
      if (a.action !== "UPLOAD_EVIDENCE") return;
      const day = new Date(a.timestamp);
      const keyDate = new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate()
      ).toDateString();
      if (map.has(keyDate)) {
        map.get(keyDate).uploads += 1;
      }
    });
    return Array.from(map.values());
  }, [audits]);

  const casesByAgency = useMemo(
    () =>
      charts.casesByAgency
        .sort((a, b) => b.value - a.value)
        .slice(0, 8),
    [charts.casesByAgency]
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Law Enforcement — Dashboard
          </h1>
          <p className="text-gray-600">
            Evidence intake, workload trends, and custody tracking.
          </p>
        </div>
        <div className="self-start flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          <ShieldCheck className="w-4 h-4" />
          CJIS / FedRAMP Compliant (Simulated)
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Cases Submitted (7d)"
          value={kpis.casesSubmittedWeek}
          subtitle="Last 7 days"
          color="bg-blue-600"
          icon={FolderPlus}
          path="/lea"
        />
        <StatCard
          title="Total Evidence"
          value={kpis.evidenceCount}
          subtitle="All items"
          color="bg-green-600"
          icon={FileLock2}
          path="/bulkupload"
        />
        <StatCard
          title="Active Cases"
          value={kpis.activeCases}
          subtitle="Submitted + Accepted"
          color="bg-indigo-600"
          icon={FolderPlus}
          path="/lea"
        />
        <StatCard
          title="Custody Events"
          value={kpis.custodyEvents}
          subtitle="Audit log entries"
          color="bg-purple-600"
          icon={ShieldCheck}
          path="/chain"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Uploads over time */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold mb-2">Evidence Uploads (Last 14 Days)</h2>
          <p className="text-sm text-gray-500 mb-4">
            Daily count of digital evidence files submitted by LEA users.
          </p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={uploadsOverTime}>
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="uploads"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top submitting agencies */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold mb-2">Top Submitting Agencies</h2>
          <p className="text-sm text-gray-500 mb-4">
            Agencies ranked by number of weekly case submissions.
          </p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={casesByAgency}
              layout="vertical"
              margin={{ right: 30, }}
            >
              <XAxis type="number" allowDecimals={false} />
              <YAxis
                type="category"
                dataKey="name"
                width={180}
                tick={{ fontSize: 12 }}
              />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981">
                <LabelList dataKey="value" position="right" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Evidence */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-4">Recent Evidence</h2>
        <ul className="divide-y text-sm">
          {evidence.slice(0, 10).map((ev) => (
            <li
              key={ev.id}
              className="py-3 flex justify-between items-center hover:bg-gray-50 px-2 rounded"
            >
              <span className="font-medium truncate">{ev.filename}</span>
              <span className="text-gray-500 text-xs">{ev.type}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Custody Events */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-4">Recent Custody Events</h2>
        <ul className="divide-y text-sm">
          {audits.slice(0, 10).map((a) => (
            <li
              key={a.id}
              className="py-3 flex justify-between items-center hover:bg-gray-50 px-2 rounded"
            >
              <span>
                <span className="font-medium">{a.actor}</span> — {a.action}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(a.timestamp).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bio Sketch Generator */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="font-semibold flex items-center gap-2">
          <UserCircle2 className="w-5 h-5 text-gray-600" /> Bio Sketch Generator
        </h2>
        <p className="text-sm text-gray-500">
          Automatically generate a quick background sketch on a subject using
          uploaded evidence metadata. (Demo stub)
        </p>
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            alert("🔍 Generated Bio Sketch (stub)");
          }}
        >
          <input
            type="text"
            placeholder="Enter Case ID or Subject Name"
            className="w-full border rounded px-3 py-2 text-sm"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Generate Sketch
          </button>
        </form>
      </div>

      {/* Locked / upcoming features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="Bulk Upload"
          value="Locked"
          subtitle="Drag/drop + metadata import"
          color="bg-gray-400"
          icon={Lock}
          locked
        />
        <StatCard
          title="Automated RMS Import"
          value="Locked"
          subtitle="Auto-metadata from RMS/Judicial DB"
          color="bg-gray-400"
          icon={Lock}
          locked
        />
      </div>
    </section>
  );
}
