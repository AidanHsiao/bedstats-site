import { StatsObject } from "../getStats";
import { User } from "./setUser";

interface UserResponse {
  msg: string;
  code: number;
  username: string;
  uuid: string;
  user?: User;
  stats?: StatsObject[];
}

const config =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://bedstats-site.vercel.app";

export default async function getUser(username: string): Promise<UserResponse> {
  console.log(process.env)
  const userData = await fetch(
    `${config}/api/user/${username}?key=${process.env.NEXT_PUBLIC_SITE_API_KEY}`
  )
    .then((res) => res.json())
    .catch((e) => {});
  let msg = "";
  switch (userData.code) {
    case 3:
      msg = "Connection lost. Make sure you are connected to the internet.";
      break;
    case 2:
      msg = "That username was not found in the Mojang database. Try again.";
      break;
    default:
      msg = "That user does not exist. Please try again.";
      break;
    case 0:
      msg =
        "That user already exists. Please log in instead, or reset your password.";
      break;
  }
  return {
    msg,
    code: userData.code,
    username: userData?.username,
    uuid: userData?.uuid,
    user: userData?.user,
    stats: userData?.stats,
  };
}
