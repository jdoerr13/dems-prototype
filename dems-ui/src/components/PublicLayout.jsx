import React from "react";
import Layout from "../components/Layout";

export default function PublicPortal() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">🌍 Public Portal</h1>
        <p className="text-gray-600">
          This portal provides public access to transparency logs, notifications,
          and information shared by the Rexus Evident platform. 
        </p>

        {/* Example content */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Transparency Logs</h2>
          <p className="text-sm text-gray-600">
            Public records and accountability reports will be listed here.
          </p>
        </div>
      </div>
    </Layout>
  );
}
