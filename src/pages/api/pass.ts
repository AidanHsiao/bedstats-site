import { NextApiRequest, NextApiResponse } from "next";
import getFirestore from "../../../lib/db/initializeDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.headers["x-api-key"] !== process.env.NEXT_PUBLIC_SITE_API_KEY) {
    res.status(401).json({ success: false });
    return;
  }
  const pass = req.body.pass;
  const db = getFirestore();
  const user = await db.collection("users").where("password", "==", pass).get();
  if (user.empty) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }
  res.status(200).json(user?.docs[0]?.data());
}
