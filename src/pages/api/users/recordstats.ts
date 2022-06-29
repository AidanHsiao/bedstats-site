import { NextApiRequest, NextApiResponse } from "next";
import getUserList from "../../../../lib/db/getUserList";
import getFirestore from "../../../../lib/db/initializeDB";
import { User } from "../../../../lib/interfaces";
import getStats from "../../../../lib/getStats";
import { StatsObject } from "../../../../lib/interfaces";
import sleep from "../../../../lib/sleep";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.headers["x-api-key"] !== process.env.NEXT_PUBLIC_SITE_API_KEY) {
    res.status(401).json({ success: false });
    return;
  }
  const userList = await getUserList(
    process.env.NEXT_PUBLIC_SITE_API_KEY as string
  );
  const keys = userList.map((doc: User) => doc.hypixelAPIKey);
  const uuids = userList.map((doc: User) => doc.uuid);
  if (!uuids) {
    res.status(404).json({ success: false });
    return;
  }
  let error = false;
  for (let i = 0; i < uuids.length; i++) {
    const data = await getStats(keys[i], uuids[i], { axiosUsed: true });
    if (data.stats) {
      const timestamp = data.stats.timestamp;
      const db = getFirestore();
      const statsCollection = db
        .collection("users")
        .doc(uuids[i])
        .collection("stats");
      const existingStatsDocs = await statsCollection.get();
      const existingStats: StatsObject[] = [];
      existingStatsDocs.forEach((doc: FirebaseFirestore.DocumentData) =>
        existingStats.push(doc.data())
      );
      const mostRecentRequest = existingStats.slice(-1)[0];
      if (mostRecentRequest && existingStats.length > 1) {
        let recentRequestEquality = true;
        Object.keys(mostRecentRequest).forEach((key: string) => {
          if (
            data.stats &&
            mostRecentRequest[key as keyof StatsObject] !==
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
        .catch((err: string) => {
          error = true;
        });
    } else {
      res.status(404).json({ code: data.code });
      error = true;
      return;
    }
    await sleep(1000);
  }
  if (!error) {
    res.status(200).json({ success: true });
  }
  return;
}
