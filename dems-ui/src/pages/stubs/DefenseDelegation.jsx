import React from "react";
import { Shield } from "lucide-react";

export default function DefenseDelegation() {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Shield className="text-blue-600" /> Defense Delegation
        <span className="ml-2 badge phase2">Phase II – Stub</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FeatureCard key={0} title="Assistant Accounts" description="Create sub-accounts for paralegals and assistants." />
        <FeatureCard key={1} title="Granular Permissions" description="Assign evidence-level permissions." />
        <FeatureCard key={2} title="Delegated Audit" description="Track downloads for compliance." />
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
