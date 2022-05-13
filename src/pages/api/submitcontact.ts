import { NextApiRequest, NextApiResponse } from "next";
import { Client, Intents, MessageEmbed } from "discord.js";

interface Contact {
  email: string;
  name: string;
  discord: string;
  subject: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const client = new Client({ intents: [Intents.FLAGS.DIRECT_MESSAGES] });
  const token = process.env.NEXT_PUBLIC_DISCORD_BOT_TOKEN;
  await client.login(token);

  const user = await client.users.fetch("302942608676880385");
  const data = {
    email: req.body.email ? req.body.email : "Not given",
    name: req.body.name ? req.body.name : "Not given",
    discord: req.body.discord ? req.body.discord : "Not given",
    subject: req.body.subject,
  };
  const embed = new MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Someone has contacted you!")
    .setDescription(
      `**Email**: ${data.email}\n**Name**: ${data.name}\n**Discord**: ${data.discord}`
    )
    .addField("Message", data.subject)
    .setTimestamp(Date.now());

  const result = await user.send({ embeds: [embed] });
  res.status(200).json(result);
}
