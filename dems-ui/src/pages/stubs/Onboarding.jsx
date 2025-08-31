import React from "react";
import { UserPlus } from "lucide-react";

export default function AutomatedOnOffboarding() {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <UserPlus className="text-blue-600" /> Automated On/Offboarding
        <span className="ml-2 badge phase2">Phase II – Stub</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FeatureCard key={0} title="Self-Service Requests" description="User requests with admin approval." />
        <FeatureCard key={1} title="Directory Sync" description="Sync groups from SAML/OIDC IdPs." />
        <FeatureCard key={2} title="Deprovisioning" description="Remove access with audit log + archive." />
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
