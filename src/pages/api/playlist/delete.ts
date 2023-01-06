import type { NextApiRequest, NextApiResponse } from "next";

import { getToken } from "next-auth/jwt";
import { sanityClient } from "@services/sanity/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const token = await getToken({ req });

    if (token) {
      const response = await sanityClient.delete({
        query: `*[_type == "playlist" && _id == $id && author._ref == $user][0]`,
        params: {
          id: req.body.id,
          user: token.id,
        },
      });

      if (response) {
        res.status(200).json(response);
      } else {
        res.status(500).json({ error: "Failed to delete playlist" });
      }
    } else {
      res.status(401);
    }
  }
}
