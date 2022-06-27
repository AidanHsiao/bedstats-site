import getUser from "./db/getUser";
import { KDRatioObject, KillDeathRatios, ResourceRatio } from "./interfaces";

interface DashboardStats {
  hours: { min: number; max: number };
  resourceRatios: ResourceRatio[];
  killDeathRatios: KillDeathRatios;
  minuteStamp: number;
}

export default async function getDashboardStats(
  username: string
): Promise<DashboardStats> {
  const user = await getUser(username);
  const apiKey = user.user?.hypixelAPIKey;
  const uuid = user.user?.uuid;
  const existingStats = sessionStorage.getItem("dashboardStats")
    ? JSON.parse(sessionStorage.getItem("dashboardStats") || "")
    : "";
  const currentMinute = Math.floor(Date.now() / 1000 / 60);
  await sleep(5000);
  if (existingStats && existingStats.minuteStamp === currentMinute)
    return existingStats;
  const resp = await fetch(
    `https://api.hypixel.net/player?key=${apiKey}&uuid=${uuid}`
  ).then((resp) => resp.json());
  const hours = getHoursPlayed(resp);
  const resourceRatios = getResourceRatios(resp);
  const killDeathRatios = getKillDeathRatios(resp);
  const dashboardStats = {
    hours: hours,
    resourceRatios: resourceRatios,
    killDeathRatios: killDeathRatios,
    minuteStamp: currentMinute,
  };
  sessionStorage.setItem("dashboardStats", JSON.stringify(dashboardStats));
  return dashboardStats;
}

const xpExceptions = {
  bedwars_daily_one_more: 250,
  bedwars_weekly_challenges: 2500,
};

interface QuestData {
  [key: string]: number;
}

function getHoursPlayed(resp: any) {
  const questData = resp.player.quests;
  let questXP;
  if (questData) {
    const quests = Object.keys(resp.player.quests)
      .filter((key) => key.includes("bedwars"))
      .reduce((obj: QuestData, key) => {
        obj[key as keyof typeof quests] =
          questData[key as keyof typeof questData].completions?.length || 0;
        return obj;
      }, {});
    const exceptionArray = Object.keys(xpExceptions);
    questXP = Object.keys(quests).reduce((xp, cur) => {
      if (exceptionArray.includes(cur)) {
        xp += xpExceptions[cur as keyof typeof xpExceptions] * quests[cur];
      } else {
        const xpMult = cur.includes("weekly") ? 5000 : 500;
        xp += xpMult * quests[cur];
      }
      return xp;
    }, 0);
  } else {
    questXP = 0;
  }
  const experience = resp.player.stats.Bedwars.Experience;
  const winXP =
    (resp.player.stats.Bedwars.eight_one_wins_bedwars ||
      0 + resp.player.stats.Bedwars.eight_two_wins_bedwars ||
      0 + resp.player.stats.Bedwars.four_three_wins_bedwars ||
      0 * 0.5 + resp.player.stats.Bedwars.four_four_wins_bedwars ||
      0 * 0.5) * 100;
  const xpDiff = experience - questXP - winXP;
  const gamesPlayed =
    resp.player.stats.Bedwars.wins_bedwars +
    resp.player.stats.Bedwars.losses_bedwars;
  return {
    min: xpDiff / 25 / 60,
    max: (experience / 25 + gamesPlayed * 2) / 60, // Adding games played gives worse case scenario of if game ended at x:59
  };
}

const gameTypes = [
  "", // Empty is for all stats, the rest are prefixes
  "eight_one_",
  "eight_two_",
  "four_three_",
  "four_four_",
];

function getResourceRatios(resp: any) {
  const bedwars = resp.player.stats.Bedwars;
  const resourceTypes = ["gold", "diamond", "emerald"]; // Gold and iron are generated simultaneously
  const resourceRatios: ResourceRatio[] = gameTypes.map((gamemode: string) => {
    return resourceTypes.reduce((obj: Partial<ResourceRatio>, resource) => {
      obj[resource === "gold" ? "forge" : (resource as keyof ResourceRatio)] =
        bedwars[`${gamemode}${resource}_resources_collected_bedwars`] || 0;
      return obj;
    }, {}) as ResourceRatio;
  });
  return resourceRatios;
}

function getKillDeathRatios(resp: any) {
  const bedwars = resp.player.stats.Bedwars;
  return {
    damage: {
      kills: bedwars.entity_attack_kills_bedwars || 0,
      deaths: bedwars.entity_attack_deaths_bedwars || 0,
      finalKills: bedwars.entity_attack_final_kills_bedwars || 0,
      finalDeaths: bedwars.entity_attack_final_deaths_bedwars || 0,
    },
    void: {
      kills: bedwars.void_kills_bedwars || 0,
      deaths: bedwars.void_deaths_bedwars || 0,
      finalKills: bedwars.void_final_kills_bedwars || 0,
      finalDeaths: bedwars.void_final_deaths_bedwars || 0,
    },
  };
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
