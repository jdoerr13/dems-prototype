// src/pages/Analytics.jsx
import React from "react";
import {
  BarChart3,
  Clock,
  FileText,
  ShieldCheck,
  Activity,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Mock evidence uploads per month
const mockUploadData = [
  { month: "Jan", uploads: 42 },
  { month: "Feb", uploads: 58 },
  { month: "Mar", uploads: 71 },
  { month: "Apr", uploads: 65 },
  { month: "May", uploads: 89 },
  { month: "Jun", uploads: 120 },
  { month: "Jul", uploads: 98 },
];

export default function Analytics() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Analytics</h2>
          <p className="text-gray-600">
            Insights into case activity, evidence trends, and performance
            metrics.
             {/* <span className="font-semibold">Phase II – Planned</span> */}
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
         Phase II – Custom Feature
        </span>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          icon={BarChart3}
          title="Evidence Upload Trends"
          description="Visualize daily and monthly evidence uploads across agencies."
        />
        <FeatureCard
          icon={Clock}
          title="Case Processing Times"
          description="Track how long cases remain in Submitted vs Accepted state."
        />
        <FeatureCard
          icon={FileText}
          title="Discovery Insights"
          description="Monitor how much evidence is linked to accepted cases."
        />
        <FeatureCard
          icon={ShieldCheck}
          title="Chain of Custody Integrity"
          description="Future anomaly detection on audit logs (tampering, gaps)."
        />
        <FeatureCard
          icon={Activity}
          title="AI-Powered Insights"
          description="Compare patterns across case types (e.g., narcotics vs cybercrime)."
        />
      </div>

      {/* Mock Chart Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Example Visualization (Mock Data)
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockUploadData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="uploads" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-gray-500 mt-3 italic">
          *Demo only – not live data*
        </p>
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col hover:shadow-lg transition">
      <div className="flex items-center gap-3 mb-3">
        <Icon className="w-6 h-6 text-blue-600" />
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
