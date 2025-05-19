import React from "react";
import { ProtectedRoute } from "../../layout/ProtectedRoute";
import Layout from "../../layout/Layout";
import { useProfile } from "./useProfile";
import { Link } from "react-router";

const Profile = () => {
  useProfile();
  return (
    <ProtectedRoute>
      <Layout>
        <div>
          <Link to="/profile/create">Create Profile</Link>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default Profile;
