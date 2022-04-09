interface User {
  code: number;
  msg: string;
  username?: string;
  uuid?: string;
  user?: any;
}

import { NextApiRequest, NextApiResponse } from "next";
import getFirestore from "../../../../db/initializeDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const username = req.query.username;
  const userData = await fetch(
    `https://api.ashcon.app/mojang/v2/user/${username}`
  )
    .then((res) => res.json())
    .catch((e) => {});
  const uuid = userData.uuid;
  try {
    const db = getFirestore();
    const data = await db.collection("users").doc(uuid).get();
    res.status(400).json(data);
  } catch (e) {
    res.status(401).json({});
  }
}
