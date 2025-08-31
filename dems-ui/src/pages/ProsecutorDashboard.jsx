import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useDashboardData from "../hooks/useDashboardData";
import toast from "react-hot-toast";

function StatCard({ title, value, color, path }) {
  const card = (
    <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center hover:shadow-lg cursor-pointer">
      <h3 className="text-gray-700 text-sm font-medium">{title}</h3>
      <span
        className={`px-3 py-1 rounded text-white font-bold text-lg ${color}`}
      >
        {value}
      </span>
    </div>
  );
  return path ? <Link to={path}>{card}</Link> : card;
}

export default function ProsecutorDashboard() {
  const { counts, cases, evidence } = useDashboardData();
  const pending = cases.filter((c) => c.status === "Submitted");

  // refs to track previous values
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

  return (
    <section className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Prosecutor — Dashboard</h1>
      <p className="text-gray-600">Approvals, discovery, and co-defendants.</p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Pending Approvals"
          value={pending.length}
          color="bg-yellow-600"
          path="/prosecutor"
        />
        <StatCard
          title="Accepted Cases"
          value={counts.acceptedCases}
          color="bg-green-600"
          path="/prosecutor"
        />
        <StatCard
          title="Defense Assigned"
          value={counts.defenseAssigned}
          color="bg-purple-600"
          path="/prosecutor"
        />
        <StatCard
          title="Co-Defendants"
          value="-"
          color="bg-gray-500"
          path="/codefendants"
        />
        <StatCard
          title="Defense Delegation"
          value="-"
          color="bg-gray-600"
          path="/delegation"
        />
        <StatCard
          title="Redaction Tools"
          value="-"
          color="bg-pink-600"
          path="/redaction"
        />
        <StatCard
          title="Analytics"
          value="-"
          color="bg-indigo-600"
          path="/analytics"
        />
      </div>

      {/* Recent Cases */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-3">Recent Cases</h2>
        <ul className="divide-y text-sm">
          {cases.slice(0, 8).map((c) => (
            <li key={c.caseId} className="py-2 flex justify-between">
              <span>
                <span className="font-medium">{c.caseId}</span> — {c.title}
              </span>
              <span className="text-gray-500">{c.status}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Discovery Evidence */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-3">Discovery Evidence</h2>
        <ul className="divide-y text-sm">
          {evidence.slice(0, 8).map((ev) => (
            <li key={ev.id} className="py-2 flex justify-between">
              <span>{ev.filename}</span>
              <span className="text-gray-500">{ev.type}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
