import { default as client } from "@sanity/client";

export const sanityClient = client({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2022-11-18",
  useCdn: true,
  token: process.env.SANITY_TOKEN,
});
