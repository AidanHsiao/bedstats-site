import React from "react";
import { useEffect, useState } from "react";
import styles from "./main.module.scss";

interface PlaytimeProps {
  error: boolean;
  hours: { min: number; max: number };
}

export default function PlaytimeWrapper({ error, hours }: PlaytimeProps) {
  const [loadingText, setLoadingText] = useState("Loading data...");

  useEffect(() => {
    if (error) {
      setLoadingText("Something went wrong. Try again later.");
      return;
    }
  }, [error]);

  return (
    <div className={styles.playtimeWrapper}>
      <div className={styles.playtimeTitle}>Your Estimated Playtime</div>
      <div style={{ opacity: hours.max ? 1 : 0 }}>
        <div className={styles.hoursTitle}>
          You&apos;ve played an estimated:
        </div>
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
        {loadingText}
      </div>
    </div>
  );
}
