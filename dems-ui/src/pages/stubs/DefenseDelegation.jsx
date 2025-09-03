// import React from "react";
// import { Shield } from "lucide-react";

// export default function DefenseDelegation() {
//   return (
//     <section>
//       <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//         <Shield className="text-blue-600" /> Defense Delegation
//         <span className="ml-2 badge phase2">Phase II – Stub</span>
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <FeatureCard key={0} title="Assistant Accounts" description="Create sub-accounts for paralegals and assistants." />
//         <FeatureCard key={1} title="Granular Permissions" description="Assign evidence-level permissions." />
//         <FeatureCard key={2} title="Delegated Audit" description="Track downloads for compliance." />
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

// pages/stubs/DefenseDelegation.jsx
import React from "react";
import { useCases } from "../../contexts/CaseContext";
import DefenseDelegation from "../../components/DefenseDelegation";

export default function DefenseDelegationPage() {
  const { cases } = useCases();
  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-4">Defense Delegation</h1>
      {cases.filter(c => c.defenseEmail).slice(0, 3).map(c => (
        <div key={c.caseId} className="mb-4">
          <h3 className="font-semibold">{c.caseId} — {c.title}</h3>
          <DefenseDelegation caseId={c.caseId} />
        </div>
      ))}
    </section>
  );
}
