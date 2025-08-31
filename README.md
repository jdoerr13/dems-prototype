# DEMS Prototype (Phase I Frontend)

This is the Phase I frontend prototype for the Williamson County Digital Evidence Management System (DEMS).  
It provides role-based portals (LEA, Prosecutor, Defense, Admin) with dashboards, evidence upload, discovery, and audit logging.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm (or yarn/pnpm)

### Install dependencies

npm install


Run locally (dev server)
npm run dev


The app will be available at http://localhost:5173


# 📂 Project Structure
src/
  components/    → shared UI components (Layout, EvidenceViewer, Upload, etc.)
  contexts/      → React contexts (Auth, Case, Role)
  hooks/         → reusable hooks (useDashboardData)
  mock/          → mock data for demo (cases, evidence, audits, notifications)
  pages/         → role-based portals, dashboards, stubs for Phase II/III
  styles/        → Tailwind CSS



# 🔑 Phase I Features

Role-based portals (LEA, Prosecutor, Defense, Admin)

Secure login flow (with MFA screen stubbed)

Evidence upload (mock state → backend-ready for integration)

Inline evidence viewer (video, image, PDF/doc stubs)

Audit trail + notifications (local mock, backend-ready)

Admin console (audit logs, notifications)