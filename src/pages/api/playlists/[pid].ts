import type { NextApiRequest, NextApiResponse } from "next";

import { getToken } from "next-auth/jwt";
import { sanityClient } from "@services/sanity/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req });

  if (!token) {
    res.status(401).send("Unauthorized action");
  }

  if (req.method === "PATCH") {
    if (!req.body.name || req.body.name === "") {
      res.status(400).send("Bad request");
    }

    const pid = req.query.pid as string;
    const response = await sanityClient.patch(pid).set({ name: req.body.name }).commit();

    if (!response) {
      res.status(500).send("Failed to rename playlist");
    }

    const data = {
      _id: response._id,
      name: response.name,
    };

    res.status(200).json(data);
  } else if (req.method === "DELETE") {
    const pid = req.query.pid as string;
    const response = await sanityClient.delete({
      query: "*[_type == 'playlist' && _id == $id && author._ref == $user][0]",
      params: {
        id: pid,
        user: token?.id,
      },
    });

    if (!response) {
      res.status(500).send("Failed to delete playlist");
    }

    const data = {
      _id: response.documentIds[0],
    };

    res.status(200).json(data);
  } else {
    res.status(405).send("Method not allowed");
  }
}
