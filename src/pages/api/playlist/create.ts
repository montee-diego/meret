import type { NextApiRequest, NextApiResponse } from "next";

import { getToken } from "next-auth/jwt";
import { sanityClient } from "@services/sanity/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const token = await getToken({ req });

    if (!token) {
      res.status(401).send("Unauthorized action");
    }

    const response = await sanityClient.create({
      _type: "playlist",
      author: {
        _type: "reference",
        _ref: token?.id,
      },
      name: req.body?.name,
      tracks: [],
    });

    if (!response) {
      res.status(500).send("Failed to create playlist");
    }

    res.status(200).json(response);
  } else {
    res.status(405).send("Method not allowed");
  }
}
