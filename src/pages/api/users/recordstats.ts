import { NextApiRequest, NextApiResponse } from "next";
import getUserList from "../../../../lib/db/getUserList";
import getFirestore from "../../../../lib/db/initializeDB";
import getStats from "../../../../lib/getStats";

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const key = req.query.key;
  if (key === process.env.SITE_API_KEY) {
    const userList = await getUserList();
    const keys = userList.map((doc: any) => doc.hypixelAPIKey);
    const uuids = userList.map((doc: any) => doc.uuid);
    if (!uuids) {
      res.status(404).json({ condition: "error" });
      return;
    }
    let error = false;
    let idx = 0;
    const interval = setInterval(async () => {
      if (idx >= keys.length) {
        clearInterval(interval);
        return;
      }
      const data = await getStats(keys[idx], uuids[idx], true);
      if (data.stats) {
        const timestamp = Math.floor(Date.now() / 1000);
        data.stats.timestamp = timestamp;
        const db = getFirestore();
        const ref = db.collection("users").doc(uuids[idx]).collection("stats");
        await ref.doc(`${timestamp}`).set(data.stats);
      } else {
        console.log(data);
        res.status(500).json({ code: data.code });
        error = true;
      }
      idx++;
    }, 1000);
    if (!error) {
      res.status(200).json({ condition: "success" });
    }
    return;
  }
  res.status(401).json({ condition: "error" });
}
