import { NextApiRequest, NextApiResponse } from "next";
import { sendStatusCode } from "next/dist/server/api-utils";
import getUserList from "../../../db/getUserList";
import setUserStats from "../../../db/setUserStats";
import getStats from "../../../util/getStats";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const key = req.query.key;
  if (key === process.env.statsApiKey) {
    const data = await getUserList();
    const keys = data
      .map((doc) => doc.hypixelAPIKey)
      .filter((key) => !key.includes("KEY"));
    const uuids = data
      .map((doc) => doc.uuid)
      .filter((uuid) => !uuid.includes("UUID"));
    uuids.forEach(async (uuid, idx) => {
      const stats = await getStats(keys[idx], uuid, true);
      if (stats.stats) {
        res.status(400).json({ condition: "success" });
      }
      if (stats.code) {
        res.status(500).json({ code: stats.code });
      }
    });
    return;
  }
  res.status(401).json({ condition: "error" });
}
