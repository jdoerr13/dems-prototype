// components/DefenseDelegation.jsx
import React, { useState } from "react";
import { useCases } from "../contexts/CaseContext";

export default function DefenseDelegation({ caseId }) {
  const { notify } = useCases();
  const [assistant, setAssistant] = useState("");

  const addAssistant = () => {
    if (!assistant) return;
    notify(`Defense assistant ${assistant} granted access to ${caseId}`);
    setAssistant("");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-4">
      <h3 className="font-semibold mb-3">Delegation</h3>
      <input
        type="email"
        placeholder="assistant@lawfirm.com"
        value={assistant}
        onChange={(e) => setAssistant(e.target.value)}
        className="border rounded px-3 py-2 text-sm w-2/3"
      />
      <button
        onClick={addAssistant}
        className="ml-2 px-3 py-2 bg-blue-600 text-white rounded text-sm"
      >
        Add Assistant
      </button>
    </div>
  );
}
