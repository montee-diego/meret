import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import { sanityClient } from "@services/sanity/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req });

  if (!token) {
    return res.status(401).send("Unauthorized action");
  }

  if (req.method === "POST") {
    if (!req.body.track) {
      return res.status(400).send("Request missing required data");
    }

    const pid = req.query.pid as string;
    const ref = { _type: "reference", _ref: req.body.track };
    const response = await sanityClient.patch(pid).append("tracks", [ref]).commit({
      autoGenerateArrayKeys: true,
    });

    if (!response) {
      return res.status(500).send("Failed to add track");
    }

    return res.status(200).json(response);
  }

  if (req.method === "DELETE") {
    if (!req.body.track) {
      return res.status(400).send("Request missing required data");
    }

    const pid = req.query.pid as string;
    const tracks = [`tracks[_key=="${req.body.track}"]`];
    const response = await sanityClient.patch(pid).unset(tracks).commit();

    if (!response) {
      return res.status(500).send("Failed to remove track(s)");
    }

    /*
      Check if track was removed, because Sanity will send an OK response
      even if no track was actually removed
    */
    const compareKeys = (track: any) => track._key === req.body.track;
    const isRemoved = response?.tracks.findIndex(compareKeys) < 0;

    if (!isRemoved) {
      return res.status(500).send("Failed to remove track(s)");
    }

    return res.status(200).json(response);
  }

  res.status(405).send("Method not allowed");
}
