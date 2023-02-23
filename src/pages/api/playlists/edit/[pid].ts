import type { NextApiRequest, NextApiResponse } from "next";

import { getToken } from "next-auth/jwt";
import { sanityClient } from "@services/sanity/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req });

  if (!token) {
    res.status(401).send("Unauthorized action");
  }

  if (req.method === "POST") {
    if (!req.body.track) {
      res.status(400).send("Bad request");
    }

    const pid = req.query.pid as string;
    const ref = { _type: "reference", _ref: req.body.track };
    const response = await sanityClient.patch(pid).append("tracks", [ref]).commit({
      autoGenerateArrayKeys: true,
    });

    if (!response) {
      res.status(500).send("Failed to add track");
    }

    res.status(200).json(response);
  } else if (req.method === "DELETE") {
    if (!req.body.track) {
      res.status(400).send("Bad request");
    }

    const pid = req.query.pid as string;
    const tracks = [`tracks[_key=="${req.body.track}"]`];
    const response = await sanityClient.patch(pid).unset(tracks).commit();

    if (!response) {
      res.status(500).send("Failed to remove track(s)");
    }

    res.status(200).json(response);
  } else {
    res.status(405).send("Method not allowed");
  }
}
