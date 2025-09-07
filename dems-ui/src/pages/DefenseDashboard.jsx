// src/pages/DefenseDashboard.jsx
import React, { useEffect, useRef, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from "recharts";
import {
  ShieldCheck,
  FileSearch,
  UserPlus,
  Lock,
  ClipboardList,
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

export default function DefenseDashboard() {
  const { counts, cases, evidence, charts } = useDashboardData();
  const defenseCases = cases.filter((c) => !!c.defenseEmail);

  // Toast notifications
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

  // Delegation Assistants (stub)
  const [assistants, setAssistants] = useState([
    { id: 1, name: "Assistant A", email: "assistantA@lawfirm.com" },
  ]);
  const addAssistant = () => {
    const id = assistants.length + 1;
    setAssistants([
      ...assistants,
      { id, name: `Assistant ${id}`, email: `assistant${id}@lawfirm.com` },
    ]);
    toast.success("👥 Assistant account created");
  };

  // Mock AI Redaction Alerts (clarified categories)
  const redactionAlerts = useMemo(
    () => [
      { name: "Faces Detected", value: 14 },
      { name: "License Plates", value: 7 },
      { name: "Sensitive Docs", value: 5 },
      { name: "PII / Text", value: 3 },
    ],
    []
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Defense — Dashboard
          </h1>
          <p className="text-gray-600">
            Discovery packets, delegation, and AI-based redaction alerts.
          </p>
        </div>
        <div className="self-start flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          <ShieldCheck className="w-4 h-4" />
          Secure Role-Based Access
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Assigned Cases"
          value={defenseCases.length}
          subtitle="Linked to your account"
          color="bg-purple-600"
          icon={FileSearch}
          path="/defense"
        />
        <StatCard
          title="Evidence Items"
          value={evidence.length}
          subtitle="All discovery items"
          color="bg-blue-600"
          icon={ClipboardList}
          path="/defense"
        />
        <StatCard
          title="Pending Discovery"
          value={counts.submittedCases}
          subtitle="Awaiting approval"
          color="bg-yellow-600"
          icon={FileSearch}
          path="/defense"
        />
        <StatCard
          title="Delegation"
          value={assistants.length}
          subtitle="Assistants with access"
          color="bg-indigo-600"
          icon={UserPlus}
          path="/delegation"
        />
        <StatCard
          title="Transparency Logs"
          value="Locked"
          subtitle="Audit trail visibility"
          color="bg-gray-400"
          icon={Lock}
          path="/transparency-internal"
          locked
        />
      </div>

      {/* Redaction Alerts */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-2">AI Redaction Alerts</h2>
        <p className="text-sm text-gray-500 mb-4">
          Mock AI analysis of uploaded evidence has flagged{" "}
          <strong>sensitive elements</strong> like faces, license plates, and
          documents requiring review before release.
        </p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={redactionAlerts}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#f59e0b">
              <LabelList dataKey="value" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Cases with Discovery */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-4">Cases with Discovery</h2>
        <ul className="divide-y text-sm">
          {defenseCases.map((c) => (
            <li
              key={c.caseId}
              className="py-3 flex justify-between items-center hover:bg-gray-50 px-2 rounded"
            >
              <span>
                <span className="font-medium">{c.caseId}</span> — {c.title}
              </span>
              <button
                onClick={() =>
                  toast.success(`📂 Opened discovery for ${c.caseId}`)
                }
                className="text-xs px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                View Discovery
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Delegation Management */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="font-semibold">Delegation (Assistant Accounts)</h2>
        <p className="text-sm text-gray-500">
          Create assistant accounts with case-limited access to discovery
          materials.
        </p>
        <ul className="divide-y text-sm">
          {assistants.map((a) => (
            <li key={a.id} className="py-2 flex justify-between">
              <span>
                {a.name} — {a.email}
              </span>
              <span className="text-xs text-gray-400">Active</span>
            </li>
          ))}
        </ul>
        <button
          onClick={addAssistant}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
        >
          + Add Assistant
        </button>
      </div>

      {/* Discovery Requests */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-3">Discovery Requests</h2>
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("📑 Discovery request submitted");
          }}
        >
          <input
            type="text"
            placeholder="Case ID"
            className="w-full border rounded px-3 py-2 text-sm"
            required
          />
          <textarea
            placeholder="Reason / Motion text"
            className="w-full border rounded px-3 py-2 text-sm"
            rows={3}
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Submit Request
          </button>
        </form>

        <h3 className="font-semibold mt-6 mb-2">Pending Requests</h3>
        <ul className="divide-y text-sm">
          <li className="py-2 flex justify-between">
            <span>Case C-1007 — Motion for Discovery</span>
            <span className="text-xs text-gray-400">Awaiting DA Approval</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
