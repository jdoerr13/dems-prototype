# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.





## DEMS Prototype – Frontend Architecture (Phase I)
This React + Vite + Tailwind frontend implements the Digital Evidence Management System (DEMS) prototype.
It is designed to be role-based (LEA, Prosecutor, Defense, Admin) with dashboards, evidence upload, discovery, audit trails, and notifications.
 
Top-Level Files
•	vite.config.js, tailwind.config.js, postcss.config.js
Frontend build + styling configs (Vite + Tailwind).
•	package.json
Lists dependencies (React, react-router, react-hot-toast, recharts, etc).
•	index.html
Entry HTML file served by Vite.
 
Entry Point
•	src/main.jsx
Boots the React app. Wraps everything in <BrowserRouter> and context providers.
•	src/App.jsx
Central router.
Defines Routes → directs to portals, dashboards, or stub pages based on user role.
Wraps routes in ProtectedRoute or PublicLayout.
 
Contexts (Global State)
•	contexts/AuthContext.jsx
Manages authentication state (login/logout, current user).
Currently runs off mock users from mock/data.js.
Backend will replace mock with real /api/login and /api/mfa.
•	contexts/RoleContext.jsx
Tracks which role is active (LEA, Prosecutor, Defense, Admin).
Used to control sidebar navigation and portal access.
•	contexts/CaseContext.jsx
Central state for cases, evidence, audits, notifications.
Functions include:
o	addCase, addEvidence → add records + fire notifications.
o	acceptCase, assignDefense, linkCoDefendant → case workflows.
o	addAudit, notify, markAllRead.
Frontend-ready to call backend endpoints later.
 
Components (Shared UI)
•	Layout.jsx
Main shell: sidebar navigation, notification bell + dropdown, and logout.
Uses contexts to render role-specific navigation.
•	PublicLayout.jsx
Simplified layout for public pages (login, transparency logs).
•	ProtectedRoute.jsx
Guards routes → redirects unauthenticated users to /login.
•	AuditTrail.jsx
Displays chronological audit events.
•	EvidenceUpload.jsx
Upload component. Currently pushes files into CaseContext.
Backend integration will forward files → S3/Supabase.
•	EvidenceViewer.jsx
Displays evidence inline (video, image, PDF/doc placeholders).
When backend returns real file URLs, Viewer renders directly.
 
Hooks
•	hooks/useDashboardData.js
Collects counts and summary metrics for dashboards.
Pulls from CaseContext. Used in LEA, Prosecutor, Defense, and Admin dashboards.
 
Mock Data
•	mock/data.js
Seed dataset for demo.
Includes:
o	initialCases (case objects with status, officers, assignments)
o	initialEvidence (files with type/URL stubs)
o	initialAudits (audit logs)
o	initialNotifications
This makes the frontend fully demo-able without a backend.
 
Pages
Core Role Portals
•	LEAPortal.jsx → Law Enforcement upload portal. Case/evidence entry.
•	ProsecutorPortal.jsx → Case management, approvals, assign defense, link co-defendants.
•	DefensePortal.jsx → Discovery portal, read-only access to assigned evidence.
•	AdminConsole.jsx → Admin management (users, audits, settings).
Dashboards
•	LEADashboard.jsx → Case counts, evidence breakdown, custody events.
•	ProsecutorDashboard.jsx → Pending approvals, discovery evidence, toast alerts.
•	DefenseDashboard.jsx → Assigned cases, evidence list, toast alerts.
•	AdminConsoleDashboard.jsx → Case stats, audit logs, notifications, CSV export stub.
Auth
•	Login.jsx → Login screen. Currently mock auth, backend-ready.
•	MFA.jsx → MFA challenge screen (stubbed, ready to connect).
Phase II / III Stubs
Located in pages/stubs/.
Each one represents a roadmap feature that can be demoed but not yet integrated:
•	AdvancedAudit.jsx (Phase II reporting)
•	BulkUpload.jsx
•	ChainOfCustody.jsx
•	CoDefendants.jsx
•	DefenseDelegation.jsx
•	Analytics.jsx
•	Redaction.jsx
•	CrossAgency.jsx
•	Archival.jsx
•	TransparencyLogs.jsx / TransparencyLogsInternal.jsx
•	UserManagement.jsx
•	Integrations.jsx, Onboarding.jsx, PublicPortal.jsx
