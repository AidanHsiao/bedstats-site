import { NextApiRequest, NextApiResponse } from "next";
import getFirestore from "../../../../lib/db/initializeDB";
import { StatsObject } from "../../../../lib/interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    default: {
      let error = false;
      const { username } = req.query;
      const userData = await fetch(
        `https://api.ashcon.app/mojang/v2/user/${username}`
      )
        .then((res) => res.json())
        .catch((e) => {
          res.status(400).json({ code: 3 });
          error = true;
        });
      if (error) {
        return;
      }
      if (userData.error) {
        res.status(400).json({ code: 2 });
      }
      const uuid = userData.uuid;
      let user;
      const db = getFirestore();
      user = (await db.collection("users").doc(uuid).get()).data();
      if (!user) {
        res
          .status(404)
          .json({ code: 1, username: userData.username, uuid: userData.uuid });
        return;
      }
      const col = await db.collection("users").doc(uuid).collection("stats");
      const docs = await col.get();
      const stats: StatsObject[] = [];
      docs.forEach((doc: FirebaseFirestore.DocumentData) =>
        stats.push(doc.data())
      );
      res.status(200).json({
        code: 0,
        username: userData.username,
        uuid: userData.uuid,
        user: user,
        stats: stats,
      });
      break;
    }
    case "POST": {
      if (req.headers["X-Api-Key"] !== process.env.NEXT_PUBLIC_SITE_API_KEY)
        return;
      const user = req.body;
      const db = getFirestore();
      await db.collection("users").doc(user.uuid).set(user);
      break;
    }
  }
}
