import React from "react";
import { useEffect, useState } from "react";
import styles from "./main.module.scss";

interface PlaytimeProps {
  hypixelAPIKey: string;
}

interface QuestData {
  [key: string]: number;
}

export default function PlaytimeWrapper({ hypixelAPIKey }: PlaytimeProps) {
  const [hours, setHours] = useState({ min: 0, max: 0 });

  useEffect(() => {
    if (!hypixelAPIKey) return;
    obtainStats();
  }, [hypixelAPIKey]);

  const xpExceptions = {
    bedwars_daily_one_more: 250,
    bedwars_weekly_challenges: 2500,
  };

  async function obtainStats() {
    const apiKey = hypixelAPIKey;
    const uuid =
      sessionStorage.getItem("uuid") || localStorage.getItem("uuid") || "";
    const resp = await fetch(
      `https://api.hypixel.net/player?key=${apiKey}&uuid=${uuid}`
    ).then((resp) => resp.json());
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
    setHours({
      min: xpDiff / 25 / 60,
      max: (experience / 25 + gamesPlayed * 2) / 60, // Adding games played gives worse case scenario of if game ended at x:01
    });
  }

  return (
    <div className={styles.playtimeWrapper}>
      <div className={styles.playtimeTitle}>Your Estimated Playtime</div>
      <div style={{ opacity: hours.max ? 1 : 0 }}>
        <div className={styles.hoursTitle}>You've played an estimated:</div>
        <div className={styles.hoursText}>
          <div className={styles.hourCount}> {hours.min.toFixed(1)} </div> to
          <div className={styles.hourCount}> {hours.max.toFixed(1)}</div>
        </div>
        <div className={styles.hoursSubtitle}>hours.</div>
      </div>
      <div
        className={styles.loadingText}
        style={{ opacity: hours.max ? 0 : 1 }}
      >
        Loading data...
      </div>
    </div>
  );
}
