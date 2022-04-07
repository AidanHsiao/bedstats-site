import { ReactElement } from "react";
import tracker from "../../../../public/tracker.png";
import leaderboards from "../../../../public/leaderboards.png";
import stats from "../../../../public/stats.png";
import settings from "../../../../public/settings.png";
import styles from "./main.module.css";
import Card from "./Card";

export default function Cards(): ReactElement {
  return (
    <div className={styles.cardWrapper}>
      <Card
        src={tracker}
        imageLoc="left"
        title="Chat-based Tracker"
        content="BedStats polls your local log file to get the stats of everyone that joins your lobby. Since it doesn't directly hook into the client, it isn't directly bannable, but keep in mind that these kinds of mods are &quot;use at your own risk&quot;."
      />
      <Card
        src={leaderboards}
        imageLoc="right"
        title="Local Leaderboards"
        content="Create a list of anyone you'd like, and compare your friends through a customizable leaderboard, with multiple sorting types. Change the score calculations through multiple settings, or directly edit the score equations."
      />
      <Card
        src={stats}
        imageLoc="left"
        title="Stats Viewer"
        content="Individually view anyone's stats through an interactive GUI. Change the gamemode filter to single out stats in solos, doubles, triples, or squads. Levels and names are appropriately colored to match in-game statuses."
      />
      <Card
        src={settings}
        imageLoc="right"
        title="Versatile Settings"
        content="BedStats is compatible with many third-party Minecraft clients. Change the settings however you'd like; whether it be modifying score limitations, increasing performance to your liking, or customizing the app's theme."
      />
    </div>
  );
}
