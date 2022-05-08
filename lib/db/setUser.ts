interface Friend {
  username: string;
  uuid: string;
}

export interface User {
  username: string;
  uuid: string;
  password: string;
  hypixelAPIKey: string;
  friends: Friend[];
  settings: {
    theme: string;
    animationEnabled: boolean;
    animationRate: string;
    hypixelAPIKey: string;
    pollingRate: string;
    loggingConfig: string;
    scoreCutoff: number;
    scoreConstant: number;
    equations: {
      stars: string;
      fkdr: string;
      bblr: string;
      wlr: string;
      finals: string;
      beds: string;
      wins: string;
      fkdrMargin: number;
      bblrMargin: number;
      wlrMargin: number;
      fkdrSecond: string;
      bblrSecond: string;
      wlrSecond: string;
    };
  };
}
export default async function setUser(user: User) {
  if (!process.env.SITE_API_KEY) return;
  fetch(`/api/user/${user.username}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.SITE_API_KEY,
    },
    body: JSON.stringify(user),
  });
}
