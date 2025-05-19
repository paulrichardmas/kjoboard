import React from "react";
import { ProtectedRoute } from "../../../layout/ProtectedRoute";
import Layout from "../../../layout/Layout";

const ProfileDetail = () => {
  return (
    <ProtectedRoute>
      <Layout>Profile Detail</Layout>
    </ProtectedRoute>
  );
};

export default ProfileDetail;
