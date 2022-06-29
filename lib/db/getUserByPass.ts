import baseUrl from "../baseUrl";

export default async function getUserByPass(pass: string) {
  const user = await fetch(`${baseUrl}/api/pass`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_SITE_API_KEY as string,
    },
    body: JSON.stringify({
      pass,
    }),
  })
    .then((res) => res.json())
    .catch(() => {});
  return user || {};
}
