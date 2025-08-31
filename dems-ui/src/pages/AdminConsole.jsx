import React from "react";
import { useCases } from "../contexts/CaseContext";
import AuditTrail from "../components/AuditTrail";

export default function AdminConsole() {
  const { cases, audits, notifications } = useCases();

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mt-3">
  <a href="/admin/dashboard" className="text-sm text-blue-600 hover:underline font-semibold">
    View Dashboard
  </a>
</div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Admin Console</h2>
        <p className="text-gray-600">
          Audit logs, notifications, and overview metrics.
        </p>
        <span className="inline-block mt-3 px-3 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-700">
          Phase I – Active
        </span>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Totals */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Totals</h3>
          <dl className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <dt className="font-medium">Cases</dt>
              <dd>{cases.length}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium">Notifications</dt>
              <dd>{notifications.length}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium">Accepted</dt>
              <dd>{cases.filter((c) => c.status === "Accepted").length}</dd>
            </div>
          </dl>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Notifications
          </h3>
          <ul className="divide-y divide-gray-200 text-sm text-gray-700">
            {notifications.length === 0 ? (
              <li className="py-2 text-gray-400 italic">No notifications</li>
            ) : (
              notifications.map((n) => (
                <li key={n.id} className="py-2 hover:bg-gray-50">
                  <span className="text-gray-500">
                    {new Date(n.ts).toLocaleString()}
                  </span>{" "}
                  — {n.message}
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Audit Trail */}
        <div className="lg:col-span-3">
          <AuditTrail audits={audits} />
        </div>
      </div>
    </section>
  );
}
