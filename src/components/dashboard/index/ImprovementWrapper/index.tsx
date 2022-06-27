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
  const [calculationFinished, setCalcFinished] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading data...");
  const [top, setTop] = useState([50, 50, 50]);
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
        const splicedData: StatsObject[] = [];
        limits.forEach((timestamp: number) => {
          // Using forEach to bypass TypeScript quirks
          const data = userData.find(
            (datapoint: StatsObject) => datapoint.timestamp === timestamp
          );
          if (data) splicedData.push(data);
        });
        const percentageChanges: number[] = [0, 0, 0];
        splicedData.forEach((datapoint: StatsObject, idx: number) => {
          const scoreDiff = currentDatapoint.score - datapoint.score;
          const percentChange =
            (scoreDiff / Math.max(datapoint.score, 1)) * 100;
          percentageChanges[idx] = +percentChange.toFixed(1);
        });
        setPercentages(percentageChanges);
        setCalcFinished(true);
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

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const percentageWrapper = ref.current;
    if (!percentageWrapper) return;
    const observer = new IntersectionObserver(
      async (e) => {
        if (e[0].isIntersecting && calculationFinished) {
          observer.unobserve(percentageWrapper);
          await sleep(100);
          setTop([0, 50, 50]);
          await sleep(100);
          setTop([0, 0, 50]);
          await sleep(100);
          setTop([0, 0, 0]);
        }
      },
      {
        threshold: 0.2,
      }
    );
    observer.observe(percentageWrapper);
  }, [calculationFinished]);

  return (
    <div className={styles.improvementWrapper}>
      <div className={styles.improvementTitle}>How you&apos;ve improved</div>
      <div className={styles.improvementLoading} style={{ opacity: +!opacity }}>
        {loadingText}
      </div>
      <div
        className={styles.percentageWrapper}
        style={{ opacity: opacity }}
        ref={ref}
      >
        <Percentage duration={1} percentage={percentages[0]} top={top[0]} />
        <Percentage duration={7} percentage={percentages[1]} top={top[1]} />
        <Percentage duration={31} percentage={percentages[2]} top={top[2]} />
      </div>
    </div>
  );
}

interface PercentageProps {
  duration: number;
  percentage: number;
  top: number;
}

export function Percentage({ duration, percentage, top }: PercentageProps) {
  return (
    <div
      className={styles.percentageItem}
      style={{
        top: top,
        opacity: +!(top / 50),
      }}
    >
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
