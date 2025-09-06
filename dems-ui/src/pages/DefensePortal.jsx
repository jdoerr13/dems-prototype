// src/pages/DefensePortal.jsx
import React, { useMemo, useState } from "react";
import { useCases } from "../contexts/CaseContext";
import EvidenceViewer from "../components/EvidenceViewer";
import { ShieldCheck, FileText, FileLock2, Search, X } from "lucide-react";

export default function DefensePortal() {
  const { cases, evidence } = useCases();
  const [activeItem, setActiveItem] = useState(null);
  const [query, setQuery] = useState("");
  const [filterMode, setFilterMode] = useState("assigned"); // default filter

  // Only cases assigned to defense
  const assigned = useMemo(
    () => cases.filter((c) => c.defenseEmail),
    [cases]
  );

  // Filter + search
  const processedCases = useMemo(() => {
    let data = [...assigned];

    if (filterMode === "withDiscovery") {
      data = data.filter((c) =>
        evidence.some((ev) => ev.caseId === c.caseId)
      );
    } else if (filterMode === "assigned") {
      // no extra filter, just show assigned
      data = [...assigned];
    }

    if (query) {
      const q = query.toLowerCase();
      data = data.filter(
        (c) =>
          c.caseId.toLowerCase().includes(q) ||
          (c.title || "").toLowerCase().includes(q) ||
          (c.agency || "").toLowerCase().includes(q) ||
          (c.defenseEmail || "").toLowerCase().includes(q)
      );
    }

    return data;
  }, [assigned, evidence, filterMode, query]);

  // KPI values
  const kpis = {
    assigned: assigned.length,
    withDiscovery: assigned.filter((c) =>
      evidence.some((ev) => ev.caseId === c.caseId)
    ).length,
    totalEvidence: evidence.filter((ev) =>
      assigned.some((c) => c.caseId === ev.caseId)
    ).length,
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Defense Discovery Portal
          </h2>
          <p className="text-gray-600">
            Secure access to discovery materials (read-only).
          </p>
        </div>
        <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          <ShieldCheck className="w-4 h-4" />
          Defense Access — CJIS Compliant (Simulated)
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Assigned Cases"
          value={kpis.assigned}
          subtitle="Defense assignments"
          color="bg-blue-600"
          icon={FileText}
          onClick={() => setFilterMode("assigned")}
          active={filterMode === "assigned"}
        />
        <StatCard
          title="With Discovery"
          value={kpis.withDiscovery}
          subtitle="Cases w/ evidence"
          color="bg-green-600"
          icon={FileLock2}
          onClick={() => setFilterMode("withDiscovery")}
          active={filterMode === "withDiscovery"}
        />
        <StatCard
          title="Total Evidence"
          value={kpis.totalEvidence}
          subtitle="Across assigned cases"
          color="bg-indigo-600"
          icon={FileLock2}
          // non-clickable KPI
        />
      </div>

      {/* Search */}
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by ID, title, agency..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Assigned Cases */}
      {processedCases.map((cs) => (
        <div
          key={cs.caseId}
          className="bg-white rounded-xl shadow-md p-6 mb-6 flex flex-col"
        >
        <div className="flex justify-between items-center mb-3">
  <div className="flex flex-col">
    <strong className="text-gray-800">{cs.caseId}</strong>
    <span className="text-xs text-gray-500">{cs.defenseEmail}</span>
  </div>
  <span
    className={`px-2 py-1 text-xs font-semibold rounded ${
      evidence.filter((ev) => ev.caseId === cs.caseId).length > 0
        ? "bg-green-100 text-green-700"
        : "bg-gray-100 text-gray-700"
    }`}
  >
    {evidence.filter((ev) => ev.caseId === cs.caseId).length} items
  </span>
</div>

          <p className="text-sm font-medium text-gray-700 mb-2">{cs.title}</p>

          <dl className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <dt className="font-medium">Agency</dt>
              <dd>{cs.agency}</dd>
            </div>
            <div>
              <dt className="font-medium">Status</dt>
              <dd>{cs.status}</dd>
            </div>
          </dl>

          <ul className="space-y-2">
            {evidence
              .filter((ev) => ev.caseId === cs.caseId)
              .map((ev) => (
                <li key={ev.id} className="text-sm flex items-center gap-3">
                  <button
                    className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold"
                    onClick={() => setActiveItem(ev)}
                  >
                    View
                  </button>
                  <span className="text-gray-700">{ev.filename}</span>
                </li>
              ))}
          </ul>
        </div>
      ))}

      {/* Evidence Preview Modal */}
      {activeItem && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setActiveItem(null)}
          />
          {/* Modal */}
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[80vh] overflow-y-auto p-6 z-10">
            <div className="flex justify-between items-center mb-4">
              <strong className="text-gray-800">
                Preview: {activeItem.filename}
              </strong>
              <button
                className="text-sm font-semibold text-red-600 hover:text-red-700 flex items-center gap-1"
                onClick={() => setActiveItem(null)}
              >
                <X className="w-4 h-4" /> Close
              </button>
            </div>
            <EvidenceViewer item={activeItem} />
          </div>
        </div>
      )}
    </section>
  );
}

function StatCard({ title, value, subtitle, color, icon: Icon, onClick, active }) {
  return (
    <div
      onClick={onClick}
      className={`${
        onClick ? "cursor-pointer" : ""
      } bg-white rounded-xl shadow p-6 flex flex-col hover:shadow-lg border-2 transition ${
        active ? "border-blue-500" : "border-transparent"
      }`}
    >
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-5 h-5 text-gray-500" />}
        <h3 className="text-sm text-gray-600">{title}</h3>
      </div>
      <div className="mt-2 flex items-end gap-2">
        <span className={`text-2xl font-bold text-white px-2 rounded ${color}`}>
          {value}
        </span>
        {subtitle && <span className="text-xs text-gray-500">{subtitle}</span>}
      </div>
    </div>
  );
}
