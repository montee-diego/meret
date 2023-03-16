import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import { sanityClient } from "@services/sanity/client";
import { queryUserSubs } from "@services/sanity/queries";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req });

  if (!token) {
    return res.status(401).send("Unauthorized action");
  }

  if (req.method === "POST") {
    const pid = req.query.pid as string;
    const user = token?.id as string;
    const ref = { _type: "reference", _ref: pid };
    const response = await sanityClient.patch(user).append("subs", [ref]).commit({
      autoGenerateArrayKeys: true,
    });

    if (!response) {
      return res.status(500).send("Failed to subscribe");
    }

    const data = await sanityClient.fetch(queryUserSubs(), {
      id: user,
    });

    if (!data) {
      return res.status(500).send("Failed to fetch subscriptions");
    }

    return res.status(200).json(data);
  }

  if (req.method === "DELETE") {
    const pid = req.query.pid as string;
    const user = token?.id as string;
    const ref = `subs[_ref == "${pid}"]`;
    const response = await sanityClient.patch(user).unset([ref]).commit();

    if (!response) {
      return res.status(500).send("Failed to unsubscribe");
    }

    const data = await sanityClient.fetch(queryUserSubs(), {
      id: user,
    });

    if (!data) {
      return res.status(500).send("Failed to fetch subscriptions");
    }

    return res.status(200).json(data);
  }

  res.status(405).send("Method not allowed");
}
