export default async function updateSetting(
  uuid: string,
  name: string,
  value: any
) {
  if (!process.env.NEXT_PUBLIC_SITE_API_KEY) return;
  fetch(`/api/user/${uuid}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_SITE_API_KEY,
    },
    body: JSON.stringify({ uuid, name, value }),
  });
}
