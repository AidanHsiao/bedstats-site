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
    for (let i = 0; i < uuids.length; i++) {
      const data = await getStats(keys[i], uuids[i], true);
      if (data.stats) {
        const timestamp = Math.floor(Date.now() / 1000);
        data.stats.timestamp = timestamp;
        const db = getFirestore();
        const statsCollection = db
          .collection("users")
          .doc(uuids[i])
          .collection("stats");
        const existingStatsDocs = await statsCollection.get();
        const existingStats: any[] = [];
        existingStatsDocs.forEach((doc: any) => existingStats.push(doc.data()));
        const mostRecentRequest = existingStats.slice(-1)[0];
        if (mostRecentRequest && existingStats.length > 1) {
          let recentRequestEquality = true;
          Object.keys(mostRecentRequest).forEach((key: string) => {
            if (
              data.stats &&
              mostRecentRequest[key] !==
                data.stats[key as keyof typeof data.stats] &&
              key !== "timestamp"
            ) {
              recentRequestEquality = false;
            }
          });
          if (recentRequestEquality) {
            statsCollection.doc(`t:${mostRecentRequest.timestamp}`).delete();
          }
        }
        await statsCollection
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
      await sleep(1000);
    }
    if (!error) {
      res.status(200).json({ condition: "success" });
    }
    return;
  }
  res.status(401).json({ condition: "error" });
}
