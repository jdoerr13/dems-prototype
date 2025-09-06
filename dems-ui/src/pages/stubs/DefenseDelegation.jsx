// src/pages/DefenseDelegation.jsx
import React from "react";
import { useCases } from "../../contexts/CaseContext";
import { Users, ShieldCheck, Share2 } from "lucide-react";
import DefenseDelegation from "../../components/DefenseDelegation";

export default function DefenseDelegationPage() {
  const { cases } = useCases();

  // Mock delegation entries for demo
  const mockDelegations = [
    {
      caseId: "C-2020",
      delegate: "assistant@lawfirm.com",
      role: "Paralegal",
      date: "2025-09-02",
    },
    {
      caseId: "C-2021",
      delegate: "investigator@lawfirm.com",
      role: "Investigator",
      date: "2025-09-03",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="text-blue-600" /> Defense Delegation
          </h1>
          <p className="text-gray-600">
            Assign co-counsel, paralegals, or investigators to access discovery.
            <span className="ml-2 font-semibold">Phase II – Planned</span>
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold">
          Future Feature
        </span>
      </div>

      {/* Feature highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          icon={Share2}
          title="Role Delegation"
          description="Grant limited access to assistants or paralegals."
        />
        <FeatureCard
          icon={ShieldCheck}
          title="Controlled Access"
          description="Permissions scoped by case and role."
        />
        <FeatureCard
          icon={Users}
          title="Audit Logging"
          description="Every delegated action is tracked for compliance."
        />
      </div>

      {/* Linked cases with delegation (mock) */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Delegations (Mock Data)
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 font-medium">Case ID</th>
                <th className="px-4 py-2 font-medium">Delegate</th>
                <th className="px-4 py-2 font-medium">Role</th>
                <th className="px-4 py-2 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {mockDelegations.map((d, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{d.caseId}</td>
                  <td className="px-4 py-2">{d.delegate}</td>
                  <td className="px-4 py-2">{d.role}</td>
                  <td className="px-4 py-2">{d.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Real cases from mock data */}
      <div className="space-y-4">
        {cases
          .filter((c) => c.defenseEmail)
          .slice(0, 2)
          .map((c) => (
            <div
              key={c.caseId}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h3 className="font-semibold text-gray-800 mb-2">
                {c.caseId} — {c.title}
              </h3>
              <DefenseDelegation caseId={c.caseId} />
            </div>
          ))}
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
        className="mt-4 px-3 py-1 rounded bg-gray-100 text-gray-400 text-sm cursor-not-allowed"
      >
        Coming Soon
      </button>
    </div>
  );
}
