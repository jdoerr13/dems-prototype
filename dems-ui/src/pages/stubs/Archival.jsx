import React from "react";
import { Archive } from "lucide-react";

export default function LongTermArchival() {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Archive className="text-orange-600" /> Long-term Archival
        <span className="ml-2 badge phase3">Phase III – Stub</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FeatureCard key={0} title="Tiered Storage" description="Hot / warm / cold storage tiers." />
        <FeatureCard key={1} title="Retention Schedules" description="Automated case-specific retention rules." />
        <FeatureCard key={2} title="WORM / Legal Hold" description="Immutable storage with restore drills." />
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
