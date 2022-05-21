import { User } from "../interfaces";

export default async function setUser(user: User) {
  if (!process.env.NEXT_PUBLIC_SITE_API_KEY) return;
  console.log(user.friends);
  fetch(`/api/user/${user.username}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_SITE_API_KEY,
    },
    body: JSON.stringify(user),
  });
}
