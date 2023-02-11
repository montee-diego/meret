import type { NextApiRequest, NextApiResponse } from "next";

import { getToken } from "next-auth/jwt";
import { sanityClient } from "@services/sanity/client";
import { querySyncPlaylist } from "@services/sanity/queries";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req });

  if (!token) {
    res.status(401).send("Unauthorized action");
  }

  if (req.method === "GET") {
    const pid = req.query.pid as string;
    const response = await sanityClient.fetch(querySyncPlaylist(), {
      id: pid,
    });

    if (!response) {
      res.status(500).send("Failed to sync playlists");
    }

    res.status(200).json(response);
  }
}
