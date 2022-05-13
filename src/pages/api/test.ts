import { NextApiRequest, NextApiResponse } from "next";
import { Client, Intents } from "discord.js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const client = new Client({ intents: [Intents.FLAGS.DIRECT_MESSAGES] });

  const token = process.env.NEXT_PUBLIC_DISCORD_BOT_TOKEN;
  await client.login(token);

  const user = await client.users.fetch("302942608676880385");
  user.send("hola");
}
