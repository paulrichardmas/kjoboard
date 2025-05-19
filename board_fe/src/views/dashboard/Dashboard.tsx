import React from "react";
import Button from "../../components/Button/Button";
import { ProtectedRoute } from "../../layout/ProtectedRoute";

import Layout from "../../layout/Layout";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <Layout>Dashboard</Layout>
    </ProtectedRoute>
  );
};

export default Dashboard;
