import React from "react";
import { useEffect, useState } from "react";
const { Chart } = require("react-google-charts");
import getUser from "../../../../../lib/db/getUser";
import styles from "./main.module.css";

const hour = 3600;

export interface StatsObject {
  fkdr: number;
  bblr: number;
  wlr: number;
  finals: number;
  beds: number;
  wins: number;
  stars: number;
  score: number;
  timestamp: number;
}

const defaultOptions = {
  legend: { position: "top" },
  backgroundColor: "none",
  fontName: "Karla",
  hAxis: {
    ticks: [{}],
  },
  chartArea: { width: "80%", height: "70%" },
  curveType: "function",
};

export default function ChartWrapper() {
  interface Tick {
    v: number;
    f: string;
  }

  const [loadingText, setLoadingText] = useState("Loading chart...");
  const [data, setData]: [
    [string[], [Tick, ...number[]]?],
    (arg: any) => void
  ] = useState([[]]);
  const [opacity, setOpacity] = useState(0);
  const [options, setOptions] = useState(defaultOptions);
  const [chartDuration, setChartDuration] = useState(21);
  const [chartFilter, setChartFilter] = useState("All");
  const [chartVars, setChartVars] = useState(["FKDR", "BBLR", "WLR"]);

  useEffect(() => {
    setOpacity(0);
    setLoadingText("Loading chart...");
    getBreakingIndex(chartDuration)
      .then((resp) => {
        const index = resp.breakingIndex;
        const splicedStats = resp.stats.slice(index);
        const min = splicedStats.reduce((acc: number, cur: StatsObject) => {
          return acc ? Math.min(acc, cur.timestamp) : cur.timestamp;
        }, 0);
        const splicedDists = splicedStats.map((obj: StatsObject) => {
          return obj.timestamp - min;
        });
        console.log(min, splicedDists);
        const tempData: [string[], [Tick, ...number[]]?] = [
          ["LABEL", ...chartVars],
        ];
        const ticks: Tick[] = [];
        splicedStats.forEach((obj: StatsObject, idx: number) => {
          const date = new Date(obj.timestamp * 1000);
          const display = createDate(date, resp.duration);
          const dataPoint: [Tick, ...number[]] = [
            { v: splicedDists[idx], f: display },
          ];
          chartVars.forEach((axis) => {
            dataPoint.push(obj[axis.toLowerCase() as keyof StatsObject]);
          });
          tempData.push(dataPoint);
          ticks.push({ v: splicedDists[idx], f: display });
        });
        setData(tempData);
        const newOptions = defaultOptions;
        newOptions.hAxis.ticks = ticks;
        setOptions(newOptions);
        setOpacity(1);
      })
      .catch((e) => {
        setLoadingText("Something went wrong. Try again later.");
        console.log(e);
      });
  }, [chartDuration]);
  return (
    <React.Fragment>
      <div className={styles.chartTitle}>Your stats over the last 7 days</div>
      <div className={styles.chart}>
        <div
          className={styles.chartLoadingText}
          style={{ opacity: (opacity + 1) % 2 }}
        >
          {opacity ? "" : loadingText}
        </div>

        <div className={styles.chartWrapper} style={{ opacity: opacity }}>
          <Chart
            chartType="LineChart"
            width="100%"
            height="100%"
            data={data}
            options={options}
          />
        </div>
      </div>
      <div className={styles.chartSelectorWrapper}>
        <ChartSelector
          items={"24h/3d/7d/14d/1m/3m/6m/1y/All".split("/")}
          selectFunction={setChartDuration}
        />
        <div className={styles.chartSelectorSpacing}></div>
        <ChartSelector
          items={"All/Solos/Doubles/Triples/Squads".split("/")}
          selectFunction={setChartVars}
        />
      </div>
    </React.Fragment>
  );
}

export function ChartSelector(props: any) {
  function changeValue(value: string) {
    if (props.items.includes("24h")) {
      // Select only chart duration
      let realValue = parseInt(value) || Infinity;
      if (realValue === Infinity) {
        props.selectFunction(Infinity);
        return;
      }
      let valueType = value.replace(/\d/g, "");
      switch (valueType) {
        case "h": {
          realValue /= 24;
        }
        case "d": {
          break;
        }
        case "m": {
          realValue *= 31;
          break;
        }
        case "y": {
          realValue *= 365;
          break;
        }
      }
      props.selectFunction(realValue);
    }
  }
  return (
    <div className={styles.chartSelector}>
      {props.items.map((item: string) => {
        return (
          <div
            className={styles.selectorItem}
            onClick={() => {
              changeValue(item);
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}

export function findMonth(month: number): string {
  const months = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
  return months[month];
}

export function createDate(date: Date, duration: number) {
  if (duration > 3600 * 24) {
    const day = date.getDate();
    const month = findMonth(date.getMonth());
    return `${month} ${day}`;
  }
  const hours = date.getHours() % 12 || 12;
  const type = date.getHours() < 12 ? "am" : "pm";
  return `${hours}:${
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  }${type}`;
}

async function getBreakingIndex(days: number) {
  const duration = hour * days * 24;

  const user = await getUser("Girly_Mike");
  const stats = user.user.stats;
  if (!user.user?.stats) {
    throw new Error("something went wrong LMAO");
  }
  const now = Math.floor(Date.now() / 1000);
  const dists = stats.map((obj: StatsObject) => now - obj.timestamp);
  let breakingIndex = 0;
  let broke = false;
  for (let i = dists.length - 1; i >= 0; i--) {
    if (dists[i] >= duration) {
      breakingIndex = i;
      broke = true;
      break;
    }
  }
  return { breakingIndex, stats, duration, broke };
}
