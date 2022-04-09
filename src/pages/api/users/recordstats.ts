import { NextApiRequest, NextApiResponse } from "next";
import getUserList from "../../../../lib/getUserList";
import getFirestore from "../../../../lib/initializeDB";
import getStats from "../../../../util/getStats";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const key = req.query.key;
  if (key === process.env.SITE_API_KEY) {
    const data = await getUserList();
    const keys = data.map((doc: any) => doc.hypixelAPIKey);
    const uuids = data.map((doc: any) => doc.uuid);
    uuids.forEach(async (uuid: string, idx: number) => {
      const data = await getStats(keys[idx], uuid, true);
      if (data.stats) {
        const timestamp = Math.floor(Date.now() / 1000);
        data.stats.timestamp = timestamp;
        const db = getFirestore();
        await db
          .collection("users")
          .doc(uuid)
          .collection("stats")
          .doc(`${timestamp}`)
          .set(data.stats);
      }
      if (data.code) {
        res.status(500).json({ code: data.code });
      }
    });
    res.status(400).json({ condition: "success" });
    return;
  }
  res.status(401).json({ condition: "error" });
}
