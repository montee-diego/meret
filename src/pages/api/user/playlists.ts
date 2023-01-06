import type { NextApiRequest, NextApiResponse } from "next";

import { getToken } from "next-auth/jwt";
import { sanityClient } from "@services/sanity/client";
import { queryUserPlaylists } from "@services/sanity/queries";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const token = await getToken({ req });

    if (token) {
      const response = await sanityClient.fetch(queryUserPlaylists(token.id));

      if (response) {
        res.status(200).json(response);
      } else {
        res.status(500).json({ error: "Failed to fetch user playlists" });
      }
    } else {
      res.status(401);
    }
  }
}
