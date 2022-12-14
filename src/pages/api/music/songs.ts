import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "@services/sanity/client";
import { queryAll } from "@services/sanity/queries";
import { ITrack } from "@global/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    await sanityClient
      .fetch(queryAll())
      .then((response: ITrack) => {
        //console.log(response);
        res.status(200).json(response);
      })
      .catch((error: any) => {
        //console.log(error);
        res.status(500).json({ error: "Failed to fetch Sanity data" });
      });
  }
}
