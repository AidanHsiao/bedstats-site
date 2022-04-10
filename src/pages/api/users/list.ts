import { NextApiRequest, NextApiResponse } from "next";
import getFirestore from "../../../../lib/db/initializeDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = getFirestore();
  const col = await db.collection("users").get();
  const docs: any = [];
  col.forEach((doc) => {
    docs.push(doc.data());
  });
  const data = docs.filter((doc: any) => !doc.uuid.includes("UUID"));
  res.status(200).json(data);
}
