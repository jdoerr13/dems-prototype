// src/pages/UserManagement.jsx
import React, { useState } from "react";
import { User, ShieldCheck, Mail, Lock, XCircle } from "lucide-react";

export default function UserManagement() {
  // Mock users (replace with API later)
  const [users] = useState([
    {
      id: 1,
      name: "Officer Jane Roe",
      email: "jroe@metro.gov",
      role: "LEA",
      status: "Active",
    },
    {
      id: 2,
      name: "Prosecutor John Smith",
      email: "jsmith@justice.org",
      role: "Prosecutor",
      status: "Active",
    },
    {
      id: 3,
      name: "Defense Counsel Patel",
      email: "apatel@lawfirm.com",
      role: "Defense",
      status: "Suspended",
    },
    {
      id: 4,
      name: "System Admin",
      email: "admin@system.gov",
      role: "Admin",
      status: "Active",
    },
  ]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600">
            Manage users, roles, and account statuses across the platform.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold">
          Phase II – Planned Enhancements
        </span>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          value={users.length}
          subtitle="Across all roles"
          color="bg-blue-600"
          icon={User}
        />
        <StatCard
          title="Active"
          value={users.filter((u) => u.status === "Active").length}
          subtitle="Enabled accounts"
          color="bg-green-600"
          icon={ShieldCheck}
        />
        <StatCard
          title="Suspended"
          value={users.filter((u) => u.status === "Suspended").length}
          subtitle="Disabled accounts"
          color="bg-red-600"
          icon={XCircle}
        />
      </div>

      {/* User Table */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          User Directory 
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 font-medium">Name</th>
                <th className="px-4 py-2 font-medium">Email</th>
                <th className="px-4 py-2 font-medium">Role</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{u.name}</td>
                  <td className="px-4 py-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {u.email}
                  </td>
                  <td className="px-4 py-2">{u.role}</td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      u.status === "Active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {u.status}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      disabled
                      className="px-3 py-1 text-xs rounded bg-gray-100 text-gray-400 cursor-not-allowed"
                    >
                      Manage (Future)
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function StatCard({ title, value, subtitle, color, icon: Icon }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col hover:shadow-lg transition">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-5 h-5 text-gray-500" />}
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
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
