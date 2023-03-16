import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import { sanityClient } from "@services/sanity/client";
import { queryUserData } from "@services/sanity/queries";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req });

  if (!token) {
    return res.status(401).send("Unauthorized action");
  }

  if (req.method === "GET") {
    const response = await sanityClient.fetch(queryUserData(), {
      id: token?.id,
    });

    if (!response) {
      return res.status(500).send("Failed to fetch user playlists");
    }

    return res.status(200).json(response);
  }

  if (req.method === "POST") {
    if (!req.body.name || req.body.name.length > 40) {
      return res.status(400).send("Bad request");
    }

    const response = await sanityClient.create({
      _type: "playlist",
      author: {
        _type: "reference",
        _ref: token?.id,
      },
      name: req.body.name,
      tracks: [],
    });

    if (!response) {
      return res.status(500).send("Failed to create playlist");
    }

    const data = {
      _id: response._id,
      name: response.name,
    };

    return res.status(200).json(data);
  }

  res.status(405).send("Method not allowed");
}
