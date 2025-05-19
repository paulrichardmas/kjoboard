import React from "react";
import Layout from "../../layout/Layout";
import { ProtectedRoute } from "../../layout/ProtectedRoute";
import { usePlatforms } from "./usePlatforms";
import Card from "../../components/Card/Card";
import PlatformCreateForm from "./PlatformCreateForm";

const Platforms = () => {
  const { platforms, createPlatform } = usePlatforms();
  return (
    <ProtectedRoute>
      <Layout>
        <div>
          <p className="text-lg font-bold">Platforms</p>
          <div className="flex flex-col gap-2">
            {platforms?.map((platform) => (
              <Card key={platform.platformId}>
                <p>
                  <span className="font-bold">Name:</span> {platform.name}
                </p>
                <p>
                  <span className="font-bold">Platform URL:</span>{" "}
                  {platform.platformUrl}
                </p>
                <p>
                  <span className="font-bold">Company:</span> {platform.company}
                </p>
                <p>
                  <span className="font-bold">Title:</span> {platform.title}
                </p>
                <p>
                  <span className="font-bold">Location:</span>{" "}
                  {platform.location}
                </p>
                <p>
                  <span className="font-bold">Description:</span>{" "}
                  {platform.description}
                </p>
                <p>
                  <span className="font-bold">Applications:</span>{" "}
                  {platform.applications}
                </p>
                <p>
                  <span className="font-bold">Posted date:</span>{" "}
                  {platform.postedDate}
                </p>
              </Card>
            ))}
            <PlatformCreateForm onCreate={createPlatform} />
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default Platforms;
