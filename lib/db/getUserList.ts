import baseUrl from "../baseUrl";

export default async function getUserList() {
  const list = await fetch(`${baseUrl}/api/users/list`).then((res) =>
    res.json()
  );
  return list;
}
