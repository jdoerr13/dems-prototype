import React from "react";
import { Database } from "lucide-react";

export default function JudicialRMSIntegrations() {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Database className="text-blue-600" /> Judicial / RMS Integrations
        <span className="ml-2 badge phase2">Phase II – Stub</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FeatureCard key={0} title="Metadata Import" description="Auto-import case metadata from RMS/NCIC." />
        <FeatureCard key={1} title="CMS Sync" description="Push discovery updates to prosecutor case systems." />
        <FeatureCard key={2} title="Webhooks" description="Trigger chain-of-custody event alerts." />
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
