export default async function getUserList() {
  const config =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:3000"
      : "https://bedstats-site.vercel.app";
  const list = await fetch(
    `${config}/api/users/list?key=${process.env.SITE_API_KEY}`
  ).then((res) => res.json());
  return list;
}
