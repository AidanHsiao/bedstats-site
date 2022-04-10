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
  let idx = 0;
  if (key === process.env.SITE_API_KEY) {
    const userList = await getUserList();
    const keys = userList.map((doc: any) => doc.hypixelAPIKey);
    const uuids = userList.map((doc: any) => doc.uuid);
    if (!uuids) {
      res.status(404).json({ condition: "error" });
      return;
    }
    let error = false;
    for (let i = 0; i < uuids.length; i++) {
      const data = await getStats(keys[i], uuids[i], true);
      if (data.stats) {
        const timestamp = Math.floor(Date.now() / 1000);
        data.stats.timestamp = timestamp;
        const db = getFirestore();
        console.log(idx, userList);
        await db
          .collection("users")
          .doc(uuids[idx])
          .collection("stats")
          .doc(`t:${timestamp}`)
          .set(data.stats)
          .catch((err: any) => {
            console.log(err);
            error = true;
          });
      } else {
        console.log(data);
        res.status(404).json({ code: data.code });
        error = true;
      }
    }
    if (!error) {
      res.status(200).json({ condition: "success" });
    }
    return;
  }
  res.status(401).json({ condition: "error" });
}
