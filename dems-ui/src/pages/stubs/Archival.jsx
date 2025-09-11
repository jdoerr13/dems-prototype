// src/pages/LongTermArchival.jsx
import React from "react";
import { Archive, Clock, Lock, Database, Bell } from "lucide-react";

export default function LongTermArchival() {
  // Mock archive usage stats
  const archiveStats = [
    { tier: "Hot Storage", cases: 152, size: "2.3 TB" },
    { tier: "Warm Storage", cases: 89, size: "6.7 TB" },
    { tier: "Cold Storage", cases: 45, size: "12.1 TB" },
  ];

  // Mock activity notifications
  const archiveActivity = [
    { id: "A-1", ts: Date.now() - 10000, message: "Case C-1010 archived to Warm Storage." },
    { id: "A-2", ts: Date.now() - 50000, message: "Case C-2023 moved to Cold Storage." },
    { id: "A-3", ts: Date.now() - 120000, message: "Retention rule applied to Case C-2001." },
    { id: "A-4", ts: Date.now() - 250000, message: "Legal Hold enabled on Case C-2014." },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Archive className="text-orange-600 w-7 h-7" /> Long-Term Archival
          </h2>
          <p className="text-gray-600">
            Manage retention, cold storage tiers, and legal hold policies.
            {/* <span className="ml-2 font-semibold">Phase III – Future</span> */}
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold">
          Phase III – Custom Roadmap Feature
        </span>
      </div>

      {/* Feature highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          icon={Database}
          title="Tiered Storage"
          description="Move cases between hot, warm, and cold storage for cost efficiency."
        />
        <FeatureCard
          icon={Clock}
          title="Retention Schedules"
          description="Automated case-specific retention rules with alerts."
        />
        <FeatureCard
          icon={Lock}
          title="WORM / Legal Hold"
          description="Immutable storage options and legal hold compliance drills."
        />
      </div>

      {/* Mock Archive Usage */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Archive Usage 
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 font-medium">Tier</th>
                <th className="px-4 py-2 font-medium">Cases</th>
                <th className="px-4 py-2 font-medium">Total Size</th>
              </tr>
            </thead>
            <tbody>
              {archiveStats.map((row, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{row.tier}</td>
                  <td className="px-4 py-2">{row.cases}</td>
                  <td className="px-4 py-2">{row.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fake Pagination */}
        <div className="flex justify-between items-center pt-4 border-t">
          <button
            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm disabled:opacity-50"
            disabled={true}
          >
            Previous
          </button>
          <div className="flex items-center gap-2">
            {[1, 2, 3, "...", 128].map((p, idx) => (
              <button
                key={idx}
                className={`px-3 py-1 rounded text-sm ${
                  p === 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                disabled={p === "..."}
              >
                {p}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm">
            Next
          </button>
        </div>
      </div>

      {/* Archive Activity Log */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <Bell className="w-5 h-5 text-indigo-600" /> Archive Activity 
        </h3>
        <ul className="divide-y divide-gray-200 text-sm text-gray-700 max-h-60 overflow-y-auto">
          {archiveActivity.map((a) => (
            <li key={a.id} className="py-2 hover:bg-gray-50">
              <span className="text-gray-500">
                {new Date(a.ts).toLocaleString()}
              </span>{" "}
              — {a.message}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col hover:shadow-lg transition">
      <div className="flex items-center gap-3 mb-3">
        <Icon className="w-6 h-6 text-orange-600" />
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
