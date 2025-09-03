// import React from "react";
// import { BarChart } from "lucide-react";

// export default function AnalyticsReporting() {
//   return (
//     <section>
//       <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//         <BarChart className="text-orange-600" /> Analytics & Reporting
//         <span className="ml-2 badge phase3">Phase III – Stub</span>
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <FeatureCard key={0} title="Filtering" description="Filter by agency, officer, date, evidence type." />
//         <FeatureCard key={1} title="Custom Reports" description="Generate PDF/CSV exports for court or audits." />
//         <FeatureCard key={2} title="KPIs" description="Track time-to-accept, discovery SLAs, backlog." />
//       </div>
//     </section>
//   );
// }

// function FeatureCard({ title, description }) {
//   return (
//     <div className="bg-white rounded-lg border p-4 shadow-sm">
//       <h3 className="font-semibold">{title}</h3>
//       <p className="text-sm text-gray-600 mt-1">{description}</p>
//     </div>
//   );
// }

// pages/stubs/Analytics.jsx
import React from "react";
import useDashboardData from "../../hooks/useDashboardData";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

export default function AnalyticsPage() {
  const { charts } = useDashboardData();
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <section className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-3">Cases by Status</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={charts.casesByStatus}>
              <XAxis dataKey="name" /><YAxis /><Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-3">Evidence by Type</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={charts.evidenceByType} dataKey="value" nameKey="name" outerRadius={80} label>
                {charts.evidenceByType.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
