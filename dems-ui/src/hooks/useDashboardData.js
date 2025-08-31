// src/hooks/useDashboardData.js
import { useMemo } from "react";
import { useCases } from "../contexts/CaseContext";

export default function useDashboardData() {
  const { cases = [], evidence = [], audits = [], notifications = [] } = useCases();

  const counts = useMemo(() => ({
    totalCases: cases.length,
    acceptedCases: cases.filter(c => c.status === "Accepted").length,
    submittedCases: cases.filter(c => c.status === "Submitted").length,
    rejectedCases: cases.filter(c => c.status === "Rejected").length,
    evidenceItems: evidence.length,
    auditsCount: audits.length,
    notificationsCount: notifications.length,
    defenseAssigned: cases.filter(c => !!c.defenseEmail).length,
  }), [cases, evidence, audits, notifications]);

  const charts = useMemo(() => {
    const casesByStatus = [
      { name: "Submitted", value: counts.submittedCases },
      { name: "Accepted", value: counts.acceptedCases },
      { name: "Rejected", value: counts.rejectedCases },
    ];

    const evidenceByType = [
      { name: "Video", value: evidence.filter(ev => ev.type?.toLowerCase().startsWith("video")).length },
      { name: "Image", value: evidence.filter(ev => ev.type?.toLowerCase().startsWith("image")).length },
      {
        name: "Other",
        value: evidence.filter(ev => ev.type && !ev.type.toLowerCase().startsWith("video") && !ev.type.toLowerCase().startsWith("image")).length
      },
    ];

    const casesByAgencyMap = cases.reduce((acc, c) => {
      if (!c.agency) return acc;
      acc[c.agency] = acc[c.agency] || 0;
      acc[c.agency]++;
      return acc;
    }, {});
    const casesByAgency = Object.entries(casesByAgencyMap).map(([name, value]) => ({ name, value }));

    const recentAudits = audits.slice(0, 5);

    return { casesByStatus, evidenceByType, casesByAgency, recentAudits };
  }, [cases, evidence, audits, counts]);

  return { counts, charts, cases, evidence, audits, notifications };
}
