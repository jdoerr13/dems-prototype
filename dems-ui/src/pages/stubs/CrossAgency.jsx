import React from "react";
import { Share2 } from "lucide-react";

export default function CrossAgencyCollaboration() {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Share2 className="text-orange-600" /> Cross-Agency Collaboration
        <span className="ml-2 badge phase3">Phase III – Stub</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FeatureCard key={0} title="Agency Invites" description="Securely invite other agencies with scoped access." />
        <FeatureCard key={1} title="Shared Vaults" description="Shared evidence repositories with permissions." />
        <FeatureCard key={2} title="Reciprocal Audits" description="Full audit trail for external collaboration." />
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
