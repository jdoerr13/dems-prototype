// src/pages/ProsecutorPortal.jsx
import React, { useMemo, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useCases } from "../contexts/CaseContext";
import EvidenceViewer from "../components/EvidenceViewer";
import {
  ShieldCheck,
  FileSpreadsheet,
  Gavel,
  Search,
} from "lucide-react";
import toast from "react-hot-toast";

export default function ProsecutorPortal() {
  const { user } = useAuth();
  const { cases, evidence, acceptCase, linkCoDefendant, assignDefense } =
    useCases();

  const [activeCase, setActiveCase] = useState(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [filterMode, setFilterMode] = useState("all");
  const [sortMode, setSortMode] = useState("date");

  const TOTAL_CASES = 9000; // demo scale
  const PAGE_SIZE = 20;
  const TOTAL_PAGES = Math.ceil(TOTAL_CASES / PAGE_SIZE);

  // Filter + search + sort
  const processedCases = useMemo(() => {
    let data = [...cases];

    if (filterMode === "pending") {
      data = data.filter((c) => c.status === "Submitted");
    } else if (filterMode === "accepted") {
      data = data.filter((c) => c.status === "Accepted");
    } else if (filterMode === "withDiscovery") {
      data = data.filter((c) =>
        evidence.some((ev) => ev.caseId === c.caseId)
      );
    }

    if (query) {
      const q = query.toLowerCase();
      data = data.filter(
        (c) =>
          c.caseId.toLowerCase().includes(q) ||
          (c.title || "").toLowerCase().includes(q) ||
          (c.officerName || "").toLowerCase().includes(q) ||
          (c.agency || "").toLowerCase().includes(q) ||
          (c.status || "").toLowerCase().includes(q)
      );
    }

    if (sortMode === "date") {
      data.sort((a, b) => new Date(b.incidentDate) - new Date(a.incidentDate));
    } else if (sortMode === "status") {
      const order = { Accepted: 1, Submitted: 2, Rejected: 3 };
      data.sort((a, b) => (order[a.status] || 99) - (order[b.status] || 99));
    }

    return data;
  }, [cases, evidence, filterMode, query, sortMode]);

  // Pagination
  const paginatedCases = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return processedCases.slice(start, start + PAGE_SIZE);
  }, [processedCases, page]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Prosecutor — Case Management
          </h2>
          <p className="text-gray-600">
            Review submissions, accept cases, manage discovery and co-defendants.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          <ShieldCheck className="w-4 h-4" />
          Secure Access / CJIS Compliant 
        </div>
      </div>

      {/* KPI filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Cases"
          value={TOTAL_CASES}
          subtitle="All received"
          color="bg-blue-600"
          icon={FileSpreadsheet}
          onClick={() => {
            setFilterMode("all");
            setPage(1);
          }}
          active={filterMode === "all"}
        />
        <StatCard
          title="Pending"
          value={cases.filter((c) => c.status === "Submitted").length}
          subtitle="Awaiting approval"
          color="bg-yellow-600"
          icon={Gavel}
          onClick={() => {
            setFilterMode("pending");
            setPage(1);
          }}
          active={filterMode === "pending"}
        />
        <StatCard
          title="Accepted"
          value={cases.filter((c) => c.status === "Accepted").length}
          subtitle="Ready for trial"
          color="bg-green-600"
          icon={FileSpreadsheet}
          onClick={() => {
            setFilterMode("accepted");
            setPage(1);
          }}
          active={filterMode === "accepted"}
        />
        <StatCard
          title="With Discovery"
          value={cases.filter((c) =>
            evidence.some((ev) => ev.caseId === c.caseId)
          ).length}
          subtitle="Evidence uploaded"
          color="bg-indigo-600"
          icon={FileSpreadsheet}
          onClick={() => {
            setFilterMode("withDiscovery");
            setPage(1);
          }}
          active={filterMode === "withDiscovery"}
        />
      </div>

      {/* Search + Sort */}
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by ID, officer, status..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={sortMode}
          onChange={(e) => setSortMode(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="date">Sort by Date</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      {/* Case List */}
      {paginatedCases.map((cs) => (
        <div
          key={cs.caseId}
          className="bg-white rounded-xl shadow-md p-6 mb-6 flex flex-col"
        >
          <div className="flex justify-between items-center mb-3">
            <strong className="text-gray-800">{cs.caseId}</strong>
            <span
              className={`px-2 py-1 text-xs font-semibold rounded ${
                cs.status === "Accepted"
                  ? "bg-green-600 text-white"
                  : cs.status === "Submitted"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {cs.status}
            </span>
          </div>

          <p className="text-sm font-medium text-gray-700 mb-2">{cs.title}</p>

          <dl className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <dt className="font-medium">Officer</dt>
              <dd>
                {cs.officerName} ({cs.officerBadge})
              </dd>
            </div>
            <div>
              <dt className="font-medium">Incident Date</dt>
              <dd>{cs.incidentDate}</dd>
            </div>
            <div>
              <dt className="font-medium">Agency</dt>
              <dd>{cs.agency}</dd>
            </div>
          </dl>

          <div className="flex gap-2 mt-auto">
            {cs.status !== "Accepted" && (
              <button
                className="px-3 py-1 bg-green-600 text-white rounded font-semibold hover:bg-green-700 text-sm"
                onClick={() => {
                  acceptCase(cs.caseId, user.email);
                  toast.success(`⚖️ Case ${cs.caseId} accepted`);
                }}
              >
                Accept
              </button>
            )}
            <button
              className="px-3 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 text-sm"
              onClick={() => {
                const linked = prompt("Link co-defendant caseId:");
                if (linked) linkCoDefendant(cs.caseId, linked);
              }}
            >
              Link Co-Defendant
            </button>
            <button
              className="px-3 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 text-sm"
              onClick={() => {
                const email = prompt("Assign defense email:");
                if (email) assignDefense(cs.caseId, email);
              }}
            >
              Assign Defense
            </button>
            <button
              className="ml-auto text-xs text-blue-600 hover:underline"
              onClick={() => setActiveCase(cs)}
            >
              View Discovery
            </button>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {page} of {TOTAL_PAGES}
        </span>
        <button
          disabled={page === TOTAL_PAGES}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Discovery Viewer */}
      {activeCase && (
        <div className="bg-white rounded-xl shadow-md p-6 mt-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">
              Discovery — {activeCase.caseId}: {activeCase.title}
            </h3>
            <button
              className="text-sm font-semibold text-red-600 hover:text-red-700"
              onClick={() => setActiveCase(null)}
            >
              Close
            </button>
          </div>
          {evidence.filter((ev) => ev.caseId === activeCase.caseId).length ===
          0 ? (
            <p className="italic text-gray-400">No evidence uploaded.</p>
          ) : (
            <ul className="space-y-3">
              {evidence
                .filter((ev) => ev.caseId === activeCase.caseId)
                .map((ev) => (
                  <li key={ev.id}>
                    <EvidenceViewer item={ev} />
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

function StatCard({ title, value, subtitle, color, icon: Icon, onClick, active }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer bg-white rounded-xl shadow p-6 hover:shadow-lg border-2 transition ${
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
