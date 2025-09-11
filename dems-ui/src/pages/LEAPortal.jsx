// src/pages/LEAPortal.jsx
import React, { useState, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useCases } from "../contexts/CaseContext";
import EvidenceUpload from "../components/EvidenceUpload";
import {
  ShieldCheck,
  FolderPlus,
  FileLock2,
  FileText,
  Search,
  X,
  ExternalLink,
} from "lucide-react";

export default function LEAPortal() {
  const { user } = useAuth();
  const { addCase, evidence, cases } = useCases();

  const [form, setForm] = useState({
    caseId: "",
    title: "",
    officerName: "",
    officerBadge: "",
    incidentDate: "",
    agency: "Williamson County SO",
  });
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [filterMode, setFilterMode] = useState("all");
  const [sortMode, setSortMode] = useState("date");
  const [showUploads, setShowUploads] = useState(false);

  const TOTAL_CASES = 7562; // fake demo KPI number
  const PAGE_SIZE = 20;
  const TOTAL_PAGES = Math.ceil(cases.length / PAGE_SIZE);

  // Filter + search + sort
  const processedCases = useMemo(() => {
    let data = [...cases];

    if (filterMode === "active") {
      data = data.filter(
        (c) => c.status === "Submitted" || c.status === "Accepted"
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
  }, [cases, filterMode, query, sortMode]);

  // Paginate filtered real cases
  const paginatedCases = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return processedCases.slice(start, start + PAGE_SIZE);
  }, [processedCases, page]);

  // KPI values
  const kpis = {
    totalCases: TOTAL_CASES,
    totalEvidence: evidence.length,
    activeCases: cases.filter(
      (c) => c.status === "Submitted" || c.status === "Accepted"
    ).length,
  };

  // Case creation
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const createCase = (e) => {
    e.preventDefault();
    if (!form.caseId || !form.officerBadge || !form.incidentDate) {
      return alert("Case ID, Badge, and Date are required");
    }
    addCase({
      ...form,
      createdBy: user.email,
      status: "Submitted",
      prosecutorEmail: null,
    });
    setForm({
      caseId: "",
      title: "",
      officerName: "",
      officerBadge: "",
      incidentDate: "",
      agency: "Williamson County SO",
    });
  };

  // Mock upload history for LEA
  const leaUploads = evidence.filter((ev) => ev.uploadedBy === "lea@metro.gov");

  return (
    <section className="max-w-7xl mx-auto px-6 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Law Enforcement — Upload Portal
          </h2>
          <p className="text-gray-600">
            Enter metadata, create cases, and upload digital evidence.
          </p>
        </div>
        <div className="self-start flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          <ShieldCheck className="w-4 h-4" />
          CJIS / FedRAMP Compliant 
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Total Cases"
          value={kpis.totalCases}
          subtitle="All submissions"
          color="bg-blue-600"
          icon={FolderPlus}
          onClick={() => {
            setFilterMode("all");
            setPage(1);
          }}
          active={filterMode === "all"}
        />
        <StatCard
          title="Total Evidence"
          value={kpis.totalEvidence}
          subtitle="Uploaded items"
          color="bg-green-600"
          icon={FileLock2}
          onClick={() => setShowUploads(true)}
          active={showUploads}
        />
        <StatCard
          title="Active Cases"
          value={kpis.activeCases}
          subtitle="Submitted + Accepted"
          color="bg-indigo-600"
          icon={FileText}
          onClick={() => {
            setFilterMode("active");
            setPage(1);
          }}
          active={filterMode === "active"}
        />
      </div>

      {/* Upload History Modal */}
      {showUploads && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowUploads(false)}
          />
          {/* Modal */}
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6 z-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Upload History</h3>
              <button
                onClick={() => setShowUploads(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {leaUploads.length === 0 ? (
              <p className="text-gray-500 italic">No uploads found.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {leaUploads.map((ev) => (
                  <li
                    key={ev.id}
                    className="py-3 flex justify-between items-center text-sm"
                  >
                    <div>
                      <a
                        href={ev.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <strong>{ev.filename}</strong>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <span className="ml-2 text-gray-500">({ev.type})</span>
                    </div>
                    <div className="text-gray-500">
                      Case {ev.caseId} • {(ev.size / 1_000_000).toFixed(1)} MB
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Case creation */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Create New Case</h3>
        <form className="space-y-4" onSubmit={createCase}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Case ID*", name: "caseId" },
              { label: "Title", name: "title" },
              { label: "Officer Name", name: "officerName" },
              { label: "Officer Badge*", name: "officerBadge" },
              { label: "Incident Date*", name: "incidentDate", type: "date" },
              { label: "Agency", name: "agency" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <input
                  type={field.type || "text"}
                  className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name={field.name}
                  value={form[field.name]}
                  onChange={onChange}
                />
              </div>
            ))}
          </div>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700"
            type="submit"
          >
            Create Case
          </button>
        </form>
      </div>

      {/* Search + Sort */}
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by ID, officer, agency..."
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

          {/* Evidence uploader */}
          <EvidenceUpload caseId={cs.caseId} uploadedBy={user.email} />
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
    </section>
  );
}

function StatCard({ title, value, subtitle, color, icon: Icon, onClick, active }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer bg-white rounded-xl shadow p-6 flex flex-col hover:shadow-lg border-2 transition ${
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
