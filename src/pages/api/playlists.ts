import type { NextApiRequest, NextApiResponse } from "next";

import { getToken } from "next-auth/jwt";
import { sanityClient } from "@services/sanity/client";
import { queryUserPlaylists } from "@services/sanity/queries";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req });

  if (!token) {
    res.status(401).send("Unauthorized action");
  }

  if (req.method === "GET") {
    const response = await sanityClient.fetch(queryUserPlaylists(), {
      id: token?.id,
    });

    if (!response) {
      res.status(500).send("Failed to fetch user playlists");
    }

    res.status(200).json(response);
  } else if (req.method === "POST") {
    if (!req.body.name || req.body.name === "") {
      res.status(400).send("Bad request");
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
      res.status(500).send("Failed to create playlist");
    }

    const data = {
      _id: response._id,
      name: response.name,
    };

    res.status(200).json(data);
  } else {
    res.status(405).send("Method not allowed");
  }
}
