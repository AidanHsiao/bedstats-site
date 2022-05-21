import { ReactElement, useEffect, useState } from "react";
import tracker from "../../../../public/index/tracker.png";
import leaderboards from "../../../../public/index/leaderboards.png";
import stats from "../../../../public/index/stats.jpeg";
import settings from "../../../../public/index/settings.png";
import safety from "../../../../public/index/safety.png";
import free from "../../../../public/index/free.png";
import styles from "./main.module.scss";
import Image, { StaticImageData } from "next/image";

export default function Cards(): ReactElement {
  return (
    <div className={styles.cardWrapper}>
      <Card
        src={tracker}
        size={90}
        title="Chat-based Tracker"
        content="BedStats polls your local log file to get the stats of everyone that joins your lobby. Since it doesn't directly hook into the client, it isn't directly bannable, but keep in mind that these apps are &quot;use at your own risk&quot;."
      />
      <Card
        src={leaderboards}
        title="Local Leaderboards"
        content="Create a list of anyone you'd like, and compare your friends through a customizable leaderboard, with multiple sorting types. Change the score calculations through multiple settings, or directly edit the equations."
      />
      <Card
        src={stats}
        title="Stats Viewer"
        content="Individually view anyone's stats through an interactive GUI. Change the gamemode filter to single out stats in solos, doubles, triples, or squads. Levels and names are appropriately colored to recreate in-game statuses."
      />
      <Card
        src={settings}
        size={90}
        title="Versatile Settings"
        content="BedStats is compatible with many third-party Minecraft clients. Change the settings however you'd like; whether it be modifying score limitations, increasing performance to your liking, or customizing the UI."
      />
      <Card
        src={safety}
        title="100% Safe"
        content="BedStats stores and transfers your data through secure HTTPS protocols, and the BedStats database has your sensitive data encrypted, so you don't need to worry about your Minecraft account getting compromised."
      />
      <Card
        src={free}
        title="Completely Free"
        content="BedStats is a free service, and will always be a free service; there will never be features that are locked behind a paywall, so you can ensure that you're getting the best experience possible, without having to empty your wallet."
      />
    </div>
  );
}

interface CardProps {
  src: StaticImageData;
  title: string;
  content: string;
  size?: number;
}

export function Card(props: CardProps): ReactElement {
  return (
    <div className={styles.card}>
      <CardImage src={props.src} size={props.size} />
      <div className={styles.cardData}>
        <div className={styles.cardTitle}>{props.title}</div>
        <div className={styles.cardText}>{props.content}</div>
      </div>
    </div>
  );
}

export function CardImage({
  src,
  size,
}: {
  src: StaticImageData;
  size?: number;
}): ReactElement {
  const [imgSize, setSize] = useState(80);

  useEffect(() => {
    if (size) setSize(size);
  }, []);

  return (
    <div className={styles.cardImageWrapper}>
      <div
        className={styles.cardImage}
        style={{ width: imgSize, height: imgSize }}
      >
        <Image src={src} layout="fill" />
      </div>
    </div>
  );
}
