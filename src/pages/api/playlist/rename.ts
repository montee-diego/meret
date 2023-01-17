import type { NextApiRequest, NextApiResponse } from "next";

import { getToken } from "next-auth/jwt";
import { sanityClient } from "@services/sanity/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const token = await getToken({ req });

    if (!token) {
      res.status(401).send("Unauthorized action");
    }

    const { id, name } = req.body;
    const response = await sanityClient.patch(id).set({ name: name }).commit();

    if (!response) {
      res.status(500).send("Failed to rename playlist");
    }

    res.status(200).json(response);
  } else {
    res.status(405).send("Method not allowed");
  }
}
