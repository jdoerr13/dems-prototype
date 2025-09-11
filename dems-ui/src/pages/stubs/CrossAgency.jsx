// src/pages/CrossAgency.jsx
import React from "react";
import { Users, Share2, ShieldCheck } from "lucide-react";

export default function CrossAgency() {
  // Expanded mock sharing data
  const sharedCases = [
    {
      caseId: "C-2001",
      title: "State vs. Doe",
      sharedWith: "🏛️ County DA Office",
      role: "Prosecutor",
      date: "2025-09-01",
    },
    {
      caseId: "C-2023",
      title: "State vs. Carter – Weapons Charge",
      sharedWith: "⚖️ Defense Counsel – Lawfirm.com",
      role: "Defense",
      date: "2025-09-02",
    },
    {
      caseId: "C-1009",
      title: "Drug Trafficking",
      sharedWith: "🕵️ Federal Task Force",
      role: "Investigator",
      date: "2025-09-03",
    },
    {
      caseId: "C-2012",
      title: "State vs. Chen – Multi-Defendant Fraud",
      sharedWith: "🏛️ Downtown Precinct",
      role: "LEA",
      date: "2025-09-04",
    },
    {
      caseId: "C-2014",
      title: "State vs. Banks – Plea Negotiation",
      sharedWith: "⚖️ Defense – Banks Law Group",
      role: "Defense",
      date: "2025-09-05",
    },
    {
      caseId: "C-2020",
      title: "State vs. Johnson – Burglary",
      sharedWith: "🏛️ State Bureau of Investigation",
      role: "Investigator",
      date: "2025-09-06",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Cross-Agency Sharing</h2>
          <p className="text-gray-600">
            Manage case and evidence access across external agencies.
            {/* <span className="ml-2 font-semibold">Phase II – Planned</span> */}
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold">
          Phase II – Custom Feature
        </span>
      </div>

      {/* Feature highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          icon={Users}
          title="Agency Collaboration"
          description="Invite prosecutors, defense, or task forces with secure, role-based permissions."
        />
        <FeatureCard
          icon={Share2}
          title="Case Sharing"
          description="Control which cases are shared and track external access."
        />
        <FeatureCard
          icon={ShieldCheck}
          title="Compliance"
          description="CJIS / FedRAMP aligned for secure external data transfers."
        />
      </div>

      {/* Mock Invite Agency form (disabled for Phase II) */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Invite External Agency (Planned)
        </h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter agency name..."
            disabled
            className="flex-1 border rounded px-3 py-2 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
          />
          <button
            disabled
            className="px-4 py-2 bg-gray-100 text-gray-400 rounded text-sm cursor-not-allowed"
          >
            Invite
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-500 italic">
          Full Customized functionality in Phase II.
        </p>
      </div>

      {/* Shared cases table */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Shared Cases 
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 font-medium">Case ID</th>
                <th className="px-4 py-2 font-medium">Title</th>
                <th className="px-4 py-2 font-medium">Shared With</th>
                <th className="px-4 py-2 font-medium">Role</th>
                <th className="px-4 py-2 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {sharedCases.map((sc) => (
                <tr key={sc.caseId} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{sc.caseId}</td>
                  <td className="px-4 py-2">{sc.title}</td>
                  <td className="px-4 py-2">{sc.sharedWith}</td>
                  <td className="px-4 py-2">{sc.role}</td>
                  <td className="px-4 py-2">{sc.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col hover:shadow-lg transition">
      <div className="flex items-center gap-3 mb-3">
        <Icon className="w-6 h-6 text-indigo-600" />
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 flex-1">{description}</p>
      <button
        disabled
        className="mt-4 px-3 py-1 rounded bg-gray-100 text-gray-500 text-sm cursor-not-allowed"
      >
        Planned
      </button>
    </div>
  );
}
