import React from "react";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useProfile } from "./useProfile";
import Layout from "../../layout/Layout";
import Card from "../../components/Card/Card";
import { ProtectedRoute } from "../../layout/ProtectedRoute";
import { profilesSelector } from "../../store/profile";

const Profile = () => {
  useProfile();
  const navigate = useNavigate();
  const profiles = useSelector(profilesSelector);
  return (
    <ProtectedRoute>
      <Layout>
        <div>
          <Link
            className="text-blue-500 hover:cursor-pointer mb-4 block"
            to="/profile/create"
          >
            Create Profile
          </Link>

          <div className="flex flex-wrap justify-between gap-y-4">
            {profiles?.map((profile) => (
              <Card
                key={profile.profileId}
                className="hover:cursor-pointer hover:outline outline-slate-400 flex-row gap-2"
                onClick={() => navigate(`/profile/${profile.profileId}`)}
              >
                <p className="font-bold text-lg">{profile.name}</p>
                <p className="font-semibold">{profile.title}</p>
                <p>{profile.phone}</p>
                <p>{profile.location}</p>
                <p>{profile.linkedinUrl}</p>
                <div className="w-full border-t border-slate-400 my-2" />
                <p>{profile.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default Profile;
