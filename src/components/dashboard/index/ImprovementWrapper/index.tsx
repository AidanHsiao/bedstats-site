import { useEffect, useRef, useState } from "react";
import { StatsObject } from "../../../../../lib/interfaces";
import sleep from "../../../../../lib/sleep";
import { createDate } from "../ChartWrapper";
import styles from "./main.module.scss";

export default function ImprovementWrapper({
  userData,
  error,
}: {
  userData: StatsObject[];
  error: boolean;
}) {
  const [percentages, setPercentages] = useState([0, 0, 0]);
  const [opacity, setOpacity] = useState(0);
  const [loadingText, setLoadingText] = useState("Loading data...");
  const [attemptedDB, setAttempted] = useState(false);
  useEffect(() => {
    if (error) {
      setLoadingText("Something went wrong. Try again later.");
      return;
    }
    try {
      if (userData.length) {
        const scores = userData
          .map((datapoint: StatsObject) => datapoint.timestamp)
          .reverse();
        const limits = [0, 0, 0];
        scores.every((timestamp: number) => {
          const dayDifference = (scores[0] - timestamp) / 3600 / 24;
          let differenceArr = [1, 7, 31];
          let differenceMade = false;
          differenceArr.forEach((diff: number, idx: number) => {
            if (dayDifference < diff) {
              limits[idx] = timestamp;
              differenceMade = true;
            }
          });
          return differenceMade;
        });
        const currentDatapoint = userData.slice(-1)[0];
        const splicedData: StatsObject[] = limits.map((timestamp: number) => {
          const data = userData.find(
            (datapoint: StatsObject) => datapoint.timestamp === timestamp
          );
          return data as StatsObject;
        });
        const percentageChanges: number[] = [0, 0, 0];
        splicedData.forEach((datapoint: StatsObject, idx: number) => {
          const scoreDiff = currentDatapoint.score - datapoint.score;
          const percentChange =
            (scoreDiff / Math.max(datapoint.score, 1)) * 100;
          percentageChanges[idx] = +percentChange.toFixed(1);
        });
        setPercentages(percentageChanges);
        setOpacity(1);
      } else {
        if (attemptedDB) {
          const displayTime = createDate(new Date(), -1, true);
          setLoadingText(
            `You have no stats entries. One should appear around ${displayTime}.`
          );
        } else {
          setAttempted(true);
        }
      }
    } catch (e) {
      setLoadingText("Something went wrong. Try again later.");
    }
  }, [userData, error]);

  return (
    <div className={styles.improvementWrapper}>
      <div className={styles.improvementTitle}>How you&apos;ve improved</div>
      <div className={styles.improvementLoading} style={{ opacity: +!opacity }}>
        {loadingText}
      </div>
      <div className={styles.percentageWrapper} style={{ opacity: opacity }}>
        <Percentage duration={1} percentage={percentages[0]} />
        <Percentage duration={7} percentage={percentages[1]} />
        <Percentage duration={31} percentage={percentages[2]} />
      </div>
    </div>
  );
}

interface PercentageProps {
  duration: number;
  percentage: number;
}

export function Percentage({ duration, percentage }: PercentageProps) {
  return (
    <div className={styles.percentageItem}>
      <div className={styles.percentageTitle}>
        Over the last {duration > 1 ? duration : ""} day
        {duration > 1 ? "s" : ""}, <br /> your score has gone{" "}
        {percentage < 0 ? (
          <span style={{ color: "red", fontWeight: 900 }}>down</span>
        ) : (
          <span style={{ color: "green", fontWeight: 900 }}>up</span>
        )}{" "}
        by:
      </div>
      <div
        className={styles.percentage}
        style={{
          color: percentage > 0 ? "green" : percentage === 0 ? "yellow" : "red",
        }}
      >
        {Math.abs(percentage)}%
      </div>
    </div>
  );
}
