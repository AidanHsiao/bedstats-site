import { NextApiRequest, NextApiResponse } from "next";
import getFirestore from "../../../../lib/db/initializeDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.key !== process.env.SITE_API_KEY) {
    res.status(401).json({ condition: "No permission" });
    return;
  }
  const db = getFirestore();
  const col = await db.collection("users").get();
  const docs: any = [];
  col.forEach((doc) => {
    docs.push(doc.data());
  });
  res.status(200).json(docs);
}
