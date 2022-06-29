import baseUrl from "../baseUrl";
import { StatsObject } from "../interfaces";
import { User } from "../interfaces";

interface UserResponse {
  msg: string;
  code: number;
  username: string;
  uuid: string;
  user?: User;
  stats?: StatsObject[];
}

export default async function getUser(username: string): Promise<UserResponse> {
  const userData = await fetch(`${baseUrl}/api/user/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": process.env.NEXT_PUBLIC_SITE_API_KEY as string,
    },
  })
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
