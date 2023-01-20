import type { NextApiRequest, NextApiResponse } from "next";

import { getToken } from "next-auth/jwt";
import { sanityClient } from "@services/sanity/client";
import { queryUserSubs } from "@services/sanity/queries";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req });

  if (!token) {
    res.status(401).send("Unauthorized action");
  }

  if (req.method === "POST") {
    const pid = req.query.pid as string;
    const user = token?.id as string;
    const ref = { _type: "reference", _ref: pid };
    const response = await sanityClient.patch(user).append("subs", [ref]).commit({
      autoGenerateArrayKeys: true,
    });

    if (!response) {
      res.status(500).send("Failed to rename playlist");
    }

    const data = await sanityClient.fetch(queryUserSubs(), {
      id: user,
    });

    if (!data) {
      res.status(500).send("Failed to fetch subscriptions");
    }

    res.status(200).json(data);
  } else if (req.method === "DELETE") {
    const pid = req.query.pid as string;
    const user = token?.id as string;
    const ref = `subs[_ref == "${pid}"]`;
    const response = await sanityClient.patch(user).unset([ref]).commit();

    if (!response) {
      res.status(500).send("Failed to delete playlist");
    }

    const data = await sanityClient.fetch(queryUserSubs(), {
      id: user,
    });

    if (!data) {
      res.status(500).send("Failed to fetch subscriptions");
    }

    res.status(200).json(data);
  } else {
    res.status(405).send("Method not allowed");
  }
}
