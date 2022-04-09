interface User {
  msg: string;
  code: number;
  username: string;
  uuid: string;
  user?: any;
}

export default async function getUser(username: string): Promise<User> {
  const userData = await fetch(`/api/user/${username}`)
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
    username: userData.username,
    uuid: userData.uuid,
    user: userData ? userData : {},
  };
}
