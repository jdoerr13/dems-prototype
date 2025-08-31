// src/mock/data.js

// Demo users
export const users = [
  { email: "lea@county.gov", role: "lea" },
  { email: "da@county.gov", role: "prosecutor" },
  { email: "defense@bar.org", role: "defense" },
  { email: "admin@county.gov", role: "admin" },
];

// -------------------------------------------------------------------
// CASES
// -------------------------------------------------------------------
export const initialCases = [
  // Williamson County realistic
  {
    caseId: "WC-2025-001",
    title: "State vs. Smith",
    officerName: "Jane Roe",
    officerBadge: "A1234",
    incidentDate: "2025-08-20",
    agency: "Williamson County SO",
    createdBy: "lea@county.gov",
    status: "Submitted",
    prosecutorEmail: null,
    defenseEmail: "defense@bar.org",
    coDefendants: ["WC-2025-002"],
  },
  {
    caseId: "WC-2025-002",
    title: "State vs. Smith (Co-Defendant)",
    officerName: "Jane Roe",
    officerBadge: "A1234",
    incidentDate: "2025-08-20",
    agency: "Williamson County SO",
    createdBy: "lea@county.gov",
    status: "Submitted",
    prosecutorEmail: null,
    defenseEmail: null,
    coDefendants: ["WC-2025-001"],
  },

  // Generic demo cases
  { caseId: "C-1001", title: "Burglary Downtown", status: "Submitted", officerName: "Officer Smith", officerBadge: "1234", agency: "City PD", defenseEmail: null },
  { caseId: "C-1002", title: "Traffic Stop DUI", status: "Accepted", officerName: "Officer Johnson", officerBadge: "5678", agency: "County SO", defenseEmail: "defense1@lawfirm.com" },
  { caseId: "C-1003", title: "Domestic Disturbance", status: "Submitted", officerName: "Officer Lee", officerBadge: "1111", agency: "City PD", defenseEmail: null },
  { caseId: "C-1004", title: "Armed Robbery", status: "Accepted", officerName: "Officer Patel", officerBadge: "2222", agency: "Highway Patrol", defenseEmail: "defense2@lawfirm.com" },
  { caseId: "C-1005", title: "Fraudulent Checks", status: "Rejected", officerName: "Officer Kim", officerBadge: "3333", agency: "County SO", defenseEmail: null },
  { caseId: "C-1006", title: "Vandalism at Park", status: "Submitted", officerName: "Officer Rivera", officerBadge: "4444", agency: "City PD", defenseEmail: null },
  { caseId: "C-1007", title: "Homicide Investigation", status: "Accepted", officerName: "Officer Green", officerBadge: "5555", agency: "State Bureau", defenseEmail: "defense3@lawfirm.com" },
  { caseId: "C-1008", title: "Cybercrime Ring", status: "Submitted", officerName: "Officer Daniels", officerBadge: "6666", agency: "City PD", defenseEmail: null },
  { caseId: "C-1009", title: "Drug Trafficking", status: "Accepted", officerName: "Officer Carter", officerBadge: "7777", agency: "DEA", defenseEmail: "defense4@lawfirm.com" },
  { caseId: "C-1010", title: "Assault Downtown Bar", status: "Submitted", officerName: "Officer Nguyen", officerBadge: "8888", agency: "City PD", defenseEmail: null },
];

// -------------------------------------------------------------------
// EVIDENCE
// -------------------------------------------------------------------
export const initialEvidence = [
  // WC realistic
  {
    id: "ev-1",
    caseId: "WC-2025-001",
    filename: "bodycam_1.mp4",
    type: "video/mp4",
    size: 250_000_000,
    uploadedBy: "lea@county.gov",
    url: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
  },
  {
    id: "ev-2",
    caseId: "WC-2025-001",
    filename: "scene_photo.jpg",
    type: "image/jpeg",
    size: 2_000_000,
    uploadedBy: "lea@county.gov",
    url: "https://images.unsplash.com/photo-1528372444006-1bfc81acab02?q=80&w=1200&auto=format&fit=crop",
  },

  // Generic
  { id: "E-2001", caseId: "C-1001", filename: "bodycam1.mp4", type: "video/mp4", url: "#" },
  { id: "E-2002", caseId: "C-1002", filename: "dashcam1.mp4", type: "video/mp4", url: "#" },
  { id: "E-2003", caseId: "C-1002", filename: "breathalyzer-report.pdf", type: "application/pdf", url: "#" },
  { id: "E-2004", caseId: "C-1003", filename: "crime-scene-photo1.jpg", type: "image/jpeg", url: "#" },
  { id: "E-2005", caseId: "C-1004", filename: "surveillance-store.mp4", type: "video/mp4", url: "#" },
  { id: "E-2006", caseId: "C-1005", filename: "fraudulent-checks.pdf", type: "application/pdf", url: "#" },
  { id: "E-2007", caseId: "C-1006", filename: "graffiti-photos.zip", type: "image/jpeg", url: "#" },
  { id: "E-2008", caseId: "C-1007", filename: "autopsy-report.pdf", type: "application/pdf", url: "#" },
  { id: "E-2009", caseId: "C-1008", filename: "server-logs.txt", type: "text/plain", url: "#" },
  { id: "E-2010", caseId: "C-1009", filename: "drug-seizure-photo.jpg", type: "image/jpeg", url: "#" },
  { id: "E-2011", caseId: "C-1010", filename: "court-filing.pdf", type: "application/pdf", url: "https://example.com/sample.pdf" },
{ id: "E-2012", caseId: "C-1010", filename: "witness-statement.docx", type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", url: "https://example.com/sample.docx" },

];

// -------------------------------------------------------------------
// AUDITS
// -------------------------------------------------------------------
export const initialAudits = [
  // WC realistic
  { id: "A-1", timestamp: "2025-08-25T10:00:00Z", actor: "lea@county.gov", action: "LOGIN", targetId: null, ip: "127.0.0.1" },
  { id: "A-2", timestamp: "2025-08-25T10:03:00Z", actor: "lea@county.gov", action: "UPLOAD_EVIDENCE", targetId: "WC-2025-001", ip: "127.0.0.1" },

  // Generic
  { id: "A-3001", actor: "Officer Smith", action: "Uploaded bodycam footage", timestamp: Date.now() - 60000, ip: "192.168.1.2" },
  { id: "A-3002", actor: "Officer Johnson", action: "Submitted case C-1002", timestamp: Date.now() - 120000, ip: "192.168.1.3" },
  { id: "A-3003", actor: "Prosecutor Adams", action: "Accepted case C-1002", timestamp: Date.now() - 180000, ip: "192.168.1.4" },
  { id: "A-3004", actor: "Defense Attorney Lopez", action: "Accessed discovery C-1004", timestamp: Date.now() - 240000, ip: "192.168.1.5" },
  { id: "A-3005", actor: "Admin User", action: "Created new prosecutor account", timestamp: Date.now() - 300000, ip: "192.168.1.6" },
  { id: "A-3006", actor: "Officer Green", action: "Updated case notes C-1007", timestamp: Date.now() - 360000, ip: "192.168.1.7" },
];

// -------------------------------------------------------------------
// NOTIFICATIONS
// -------------------------------------------------------------------
export const initialNotifications = [
  { id: "N-4001", message: "New user request pending approval", ts: Date.now() - 10000 },
  { id: "N-4002", message: "Scheduled system maintenance tomorrow at 2 AM", ts: Date.now() - 50000 },
  { id: "N-4003", message: "Evidence retention policy updated", ts: Date.now() - 150000 },
];
