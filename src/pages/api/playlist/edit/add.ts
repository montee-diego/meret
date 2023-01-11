import type { NextApiRequest, NextApiResponse } from "next";

import { getToken } from "next-auth/jwt";
import { sanityClient } from "@services/sanity/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const token = await getToken({ req });

    if (token) {
      const { playlist, track } = req.body;
      const trackRef = {
        _type: "reference",
        _ref: track,
      };
      const response = await sanityClient
        .patch(playlist)
        .setIfMissing({ tracks: [] })
        .append("tracks", [trackRef])
        .commit({ autoGenerateArrayKeys: true });

      if (response) {
        res.status(200).json(response);
      } else {
        res.status(500).json({ error: "Failed to create playlist" });
      }
    } else {
      res.status(401);
    }
  }
}
