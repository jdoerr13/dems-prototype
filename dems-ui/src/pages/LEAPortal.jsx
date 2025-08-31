import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useCases } from "../contexts/CaseContext";
import EvidenceUpload from "../components/EvidenceUpload";

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

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const createCase = (e) => {
    e.preventDefault();
    if (!form.caseId || !form.officerBadge || !form.incidentDate) {
      return alert("Case ID, Badge, Date required");
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

  // Dynamic badge styling
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-600 text-white";
      case "Submitted":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mt-2">
  <a href="/lea/dashboard" className="text-sm text-blue-600 hover:underline font-semibold">
    View Dashboard
  </a>
</div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">LEA Upload Portal</h2>
        <p className="text-gray-600">
          Enter mandatory metadata, create cases, and upload evidence.
        </p>
        <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-700">
          Phase I – Active
        </span>
      </div>

      {/* Create New Case */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
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
            className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
          >
            Create Case
          </button>
        </form>
      </div>

      {/* Cases List */}
      {cases.length === 0 ? (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-600">
          No cases created yet.
        </div>
      ) : (
        cases.map((cs) => (
          <div
            key={cs.caseId}
            className="bg-white rounded-xl shadow-md p-6 mb-6"
          >
            <div className="flex justify-between items-center mb-3">
              <strong className="text-gray-800">{cs.caseId}</strong>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded ${getStatusBadgeClass(
                  cs.status
                )}`}
              >
                {cs.status}
              </span>
            </div>
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

            <EvidenceUpload caseId={cs.caseId} uploadedBy={user.email} />

            <div className="mt-4">
              <h4 className="font-semibold mb-2">Evidence</h4>
              {evidence.filter((ev) => ev.caseId === cs.caseId).length === 0 ? (
                <p className="text-sm text-gray-500">No evidence uploaded.</p>
              ) : (
                <ul className="list-disc list-inside text-sm">
                  {evidence
                    .filter((ev) => ev.caseId === cs.caseId)
                    .map((ev) => (
                      <li key={ev.id}>{ev.filename}</li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        ))
      )}
    </section>
  );
}
