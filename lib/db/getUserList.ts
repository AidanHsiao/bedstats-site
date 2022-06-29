import baseUrl from "../baseUrl";

export default async function getUserList(key: string) {
  const list = await fetch(`${baseUrl}/api/users/list?key=${key}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": process.env.NEXT_PUBLIC_SITE_API_KEY as string,
    },
  }).then((res) => res.json());
  return list;
}
