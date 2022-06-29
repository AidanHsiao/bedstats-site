import { NextApiRequest, NextApiResponse } from "next";
import getFirestore from "../../../../lib/db/initializeDB";
import { User } from "../../../../lib/interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.headers["x-api-key"] !== process.env.NEXT_PUBLIC_SITE_API_KEY) {
    res.status(401).json({ success: false });
    return;
  }
  const db = getFirestore();
  const col = await db.collection("users").get();
  const docs: User[] = [];
  col.forEach((doc: FirebaseFirestore.DocumentData) => {
    docs.push(doc.data());
  });
  res.status(200).json(docs);
}
