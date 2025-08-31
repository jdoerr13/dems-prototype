import React from "react";
import { BarChart } from "lucide-react";

export default function AnalyticsReporting() {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <BarChart className="text-orange-600" /> Analytics & Reporting
        <span className="ml-2 badge phase3">Phase III – Stub</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FeatureCard key={0} title="Filtering" description="Filter by agency, officer, date, evidence type." />
        <FeatureCard key={1} title="Custom Reports" description="Generate PDF/CSV exports for court or audits." />
        <FeatureCard key={2} title="KPIs" description="Track time-to-accept, discovery SLAs, backlog." />
      </div>
    </section>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-white rounded-lg border p-4 shadow-sm">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  );
}
