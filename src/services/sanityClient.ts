import { default as client } from "@sanity/client";

const sanityClient = client({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  dataset: "production",
  apiVersion: "2022-11-18",
});

export default sanityClient;
