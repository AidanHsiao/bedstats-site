import axios from "axios";

export interface Stats {
  fkdr: number;
  bblr: number;
  wlr: number;
  stars: number;
  finals: number;
  beds: number;
  wins: number;
  score: number;
  timestamp?: number;
}

interface StatsResponse {
  code: number;
  stats?: Stats;
}

const xpPerPrestige = 487000;

export default async function getStats(
  apiKey: string,
  uuid: string,
  axiosUsed?: boolean
): Promise<StatsResponse> {
  let playerData;
  if (axiosUsed) {
    const resp = await axios
      .get(`https://api.hypixel.net/player?key=${apiKey}&uuid=${uuid}`)
      .then((res) => (playerData = res.data))
      .catch((e) => {
        return { code: 2 };
      });
  } else {
    let error = false;
    const resp = await fetch(
      `https://api.hypixel.net/player?key=${apiKey}&uuid=${uuid}`
    )
      .then((res) => res.json())
      .catch((e) => {
        error = true;
      });
    if (error) {
      return { code: 2 };
    }
    playerData = resp.data;
  }
  try {
    const dataArrayNone = [
      "wins_bedwars",
      "kills_bedwars",
      "final_kills_bedwars",
      "beds_broken_bedwars",
      "eight_one_wins_bedwars",
      "eight_one_kills_bedwars",
      "eight_one_final_kills_bedwars",
      "eight_one_beds_broken_bedwars",
      "eight_two_wins_bedwars",
      "eight_two_kills_bedwars",
      "eight_two_final_kills_bedwars",
      "eight_two_beds_broken_bedwars",
      "four_three_wins_bedwars",
      "four_three_kills_bedwars",
      "four_three_final_kills_bedwars",
      "four_three_beds_broken_bedwars",
      "four_four_wins_bedwars",
      "four_four_kills_bedwars",
      "four_four_final_kills_bedwars",
      "four_four_beds_broken_bedwars",
    ];
    const dataArrayOne = [
      "losses_bedwars",
      "deaths_bedwars",
      "final_deaths_bedwars",
      "beds_lost_bedwars",
      "eight_one_losses_bedwars",
      "eight_one_deaths_bedwars",
      "eight_one_final_deaths_bedwars",
      "eight_one_beds_lost_bedwars",
      "eight_two_losses_bedwars",
      "eight_two_deaths_bedwars",
      "eight_two_final_deaths_bedwars",
      "eight_two_beds_lost_bedwars",
      "four_three_losses_bedwars",
      "four_three_deaths_bedwars",
      "four_three_final_deaths_bedwars",
      "four_three_beds_lost_bedwars",
      "four_four_losses_bedwars",
      "four_four_deaths_bedwars",
      "four_four_final_deaths_bedwars",
      "four_four_beds_lost_bedwars",
    ];
    for (let item of dataArrayNone) {
      if (!playerData.player.stats.Bedwars[item]) {
        playerData.player.stats.Bedwars[item] = 0;
      }
    }
    for (let item of dataArrayOne) {
      if (!playerData.player.stats.Bedwars[item]) {
        playerData.player.stats.Bedwars[item] = 1;
      }
    }
  } catch (e) {
    return { code: 1 };
  }
  const bedwars = playerData.player.stats.Bedwars;
  const prestiges = Math.floor(bedwars.Experience / xpPerPrestige);
  let remainder = bedwars.Experience % xpPerPrestige;

  let numStars = prestiges * 100;

  const remainderArr = [500, 100, 2000, 3500];

  remainderArr.forEach((level) => {
    if (remainder >= level) {
      remainder -= level;
      numStars++;
    }
  });

  if (remainder >= 5000) {
    numStars = numStars + Math.floor(remainder / 5000);
  }

  const stats = {
    fkdr: bedwars.final_kills_bedwars / bedwars.final_deaths_bedwars,
    wlr: bedwars.wins_bedwars / bedwars.losses_bedwars,
    bblr: bedwars.beds_broken_bedwars / bedwars.beds_lost_bedwars,
    finals: bedwars.final_kills_bedwars,
    beds: bedwars.beds_broken_bedwars,
    wins: bedwars.wins_bedwars,
  };

  let fkdrPts = (-1 * (1000 / (stats.fkdr + 10)) + 2 * stats.fkdr + 100) * 10;
  const starPts = Math.pow(numStars, 0.65) * 10;
  let wlrPts = Math.pow(stats.wlr, 1.5) * 100;
  let bblrPts = Math.pow(stats.bblr, 1.5) * 100;
  const finalPts = stats.finals / 12;
  const bedPts = stats.beds / 6;
  const winPts = stats.wins / 3;
  if (stats.fkdr > 10) {
    fkdrPts = (0.1 * Math.pow(stats.fkdr, 2) + 2.5 * stats.fkdr + 35) * 10;
  }
  if (stats.wlr > 10) {
    wlrPts = 405 * stats.wlr - 134;
  }
  if (stats.bblr > 10) {
    bblrPts = 450 * stats.bblr - 134;
  }
  const score =
    fkdrPts + starPts + wlrPts + bblrPts + finalPts + bedPts + winPts;
  return {
    code: 0,
    stats: {
      fkdr: stats.fkdr,
      bblr: stats.bblr,
      wlr: stats.wlr,
      stars: numStars,
      finals: stats.finals,
      beds: stats.beds,
      wins: stats.wins,
      score: score,
    },
  };
}
