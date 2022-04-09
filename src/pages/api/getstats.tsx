// import { NextApiRequest, NextApiResponse } from "next";
// import getUserStats from "../../../db/getUserStats";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ): Promise<void> {
//   const uuid = req.query.uuid;
//   if (typeof uuid === "string") {
//     const stats = await getUserStats(uuid);
//     res.status(400).json({ env: process.env });
//   }
// }
export {};
