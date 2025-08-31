import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { RoleProvider } from "./contexts/RoleContext";
import { CaseProvider } from "./contexts/CaseContext";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicLayout from "./components/PublicLayout";

// Pages
import Login from "./pages/Login";
import LEAPortal from "./pages/LEAPortal";
import ProsecutorPortal from "./pages/ProsecutorPortal";
import DefensePortal from "./pages/DefensePortal";
import AdminConsole from "./pages/AdminConsole";
import MFA from "./pages/MFA";


// Dashboards
import LEADashboard from "./pages/LEADashboard";
import ProsecutorDashboard from "./pages/ProsecutorDashboard";
import DefenseDashboard from "./pages/DefenseDashboard";
import AdminConsoleDashboard from "./pages/AdminConsoleDashboard";

// Stubs (Phase II & III)
import Analytics from "./pages/stubs/Analytics";
import Archival from "./pages/stubs/Archival";
import BulkUpload from "./pages/stubs/BulkUpload";
import CoDefendants from "./pages/stubs/CoDefendants";
import CrossAgency from "./pages/stubs/CrossAgency";
import DefenseDelegation from "./pages/stubs/DefenseDelegation";
import Integrations from "./pages/stubs/Integrations";
import Onboarding from "./pages/stubs/Onboarding";
import Redaction from "./pages/stubs/Redaction";
import ChainOfCustody from "./pages/stubs/ChainOfCustody";
import UserManagement from "./pages/stubs/UserManagement";
import AdvancedAudit from "./pages/stubs/AdvancedAudit";
import PublicPortal from "./pages/stubs/PublicPortal";
import TransparencyLogs from "./pages/stubs/TransparencyLogs";
import TransparencyLogsInternal from "./pages/stubs/TransparencyLogsInternal";

/**
 * RoleRedirect:
 * After login, route users to the correct portal.
 * Keeps landing experience role-specific instead of a generic dashboard.
 */

function RoleRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case "lea":
      return <Navigate to="/lea/dashboard" replace />;
    case "prosecutor":
      return <Navigate to="/prosecutor/dashboard" replace />;
    case "defense":
      return <Navigate to="/defense/dashboard" replace />;
    case "admin":
      return <Navigate to="/admin/dashboard" replace />;
    default:
      return <Navigate to="/public" replace />;
  }
}

// ---------------- App ----------------
export default function App() {
  return (
    <AuthProvider>
      <RoleProvider>
        <CaseProvider>
          <Routes>
            {/* Public */}
            <Route path="/login" element={<Login />} />
            <Route path="/mfa" element={<MFA />} />
            <Route path="/public" element={<PublicLayout><PublicPortal /></PublicLayout>} />
            <Route path="/transparency" element={<PublicLayout><TransparencyLogs /></PublicLayout>} />

            {/* Internal Transparency */}
            <Route
              path="/transparency-internal"
              element={
                <ProtectedRoute>
                  <Layout><TransparencyLogsInternal /></Layout>
                </ProtectedRoute>
              }
            />

            {/* Protected */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout>

                    
                    <Routes>
                      {/* Redirect root → role portal */}
                      <Route path="/" element={<RoleRedirect />} />

                      {/* Portals */}
                      <Route path="/lea" element={<LEAPortal />} />
                      <Route path="/prosecutor" element={<ProsecutorPortal />} />
                      <Route path="/defense" element={<DefensePortal />} />
                      <Route path="/admin" element={<AdminConsole />} />

                      {/* Dashboards */}
                      <Route path="/lea/dashboard" element={<LEADashboard />} />
                      <Route path="/prosecutor/dashboard" element={<ProsecutorDashboard />} />
                      <Route path="/defense/dashboard" element={<DefenseDashboard />} />
                      <Route path="/admin/dashboard" element={<AdminConsoleDashboard />} />

                      {/* Phase II */}
                      <Route path="/integrations" element={<Integrations />} />
                      <Route path="/delegation" element={<DefenseDelegation />} />
                      <Route path="/codefendants" element={<CoDefendants />} />
                      <Route path="/onboarding" element={<Onboarding />} />
                      <Route path="/bulkupload" element={<BulkUpload />} />
                      <Route path="/chain" element={<ChainOfCustody />} />
                      <Route path="/users" element={<UserManagement />} />
                      <Route path="/advanced-audit" element={<AdvancedAudit />} />

                      {/* Phase III */}
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/redaction" element={<Redaction />} />
                      <Route path="/cross-agency" element={<CrossAgency />} />
                      <Route path="/archival" element={<Archival />} />

                      {/* Catch-all */}
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>


                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </CaseProvider>
      </RoleProvider>
    </AuthProvider>
  );
}
