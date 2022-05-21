import React, { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
const { Chart } = require("react-google-charts");
import getUser from "../../../../lib/db/getUser";
import styles from "./main.module.scss";
import { StatsObject } from "../../../../lib/interfaces";

const hour = 3600;

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

export default function ChartWrapper({
  setUserData,
  setError,
  username,
}: {
  setUserData: Dispatch<SetStateAction<StatsObject[]>>;
  setError: Dispatch<SetStateAction<boolean>>;
  username: string;
}) {
  interface Tick {
    v: number;
    f: string;
  }

  type Data = [string[], [Tick, ...number[]]?];

  const [loadingText, setLoadingText] = useState("Loading chart...");
  const [data, setData]: [Data, Dispatch<SetStateAction<Data>>] =
    useState<Data>([[]]);
  const [opacity, setOpacity] = useState(0);
  const [durationText, setDurationText] = useState("the last day");
  const [chartVarText, setChartVarText] = useState("score");
  const [options, setOptions] = useState(defaultOptions);
  const [chartDuration, setChartDuration] = useState(1);
  const [chartVars, setChartVars] = useState(["Score"]);

  function changeChartDuration(value: number) {
    setChartDuration(value);
    switch (true) {
      case value >= 1 && value < 31: {
        setDurationText(
          `the last ${value > 1 ? value : ""} day${value > 1 ? "s" : ""}`
        );
        break;
      }
      case value >= 31 && value < 365: {
        setDurationText(
          `the last ${value / 31 > 1 ? value / 31 : ""} month${
            value > 31 ? "s" : ""
          }`
        );
        break;
      }
      case value === 365: {
        setDurationText(`the last year`);
        break;
      }
      default: {
        setDurationText("all time");
      }
    }
  }

  function changeChartVariables(chartVars: string[]) {
    switch (chartVars[0]) {
      case "Score": {
        setChartVarText("score");
        break;
      }
      case "Finals": {
        setChartVarText("stats");
        break;
      }
      case "FKDR": {
        setChartVarText("ratios");
        break;
      }
    }
    setChartVars(chartVars);
  }

  useEffect(() => {
    setOpacity(0);
    setLoadingText("Loading chart...");
    if (!username) return;
    getBreakingIndex(chartDuration, username)
      .then((resp) => {
        if (!resp.stats.length) {
          const time = new Date();
          const displayTime = createDate(time, -1, true);
          setLoadingText(
            `You have no stats entries. One should appear around ${displayTime}.`
          );
          setUserData([]);
          return;
        }
        const index = resp.breakingIndex;
        const splicedStats = resp.stats.slice(index);
        if (splicedStats.length === 1) {
          splicedStats.push({ ...splicedStats[0] }); // Create full graph if only one datapoint exists
          splicedStats[1].timestamp += 0.01;
        }
        const min = splicedStats.reduce((acc: number, cur: StatsObject) => {
          return acc ? Math.min(acc, cur.timestamp) : cur.timestamp;
        }, 0);
        const splicedDists = splicedStats.map((obj: StatsObject) => {
          return obj.timestamp - min;
        });
        const tempData: Data = [["LABEL", ...chartVars]];
        const ticks: Tick[] = [];
        splicedStats.forEach((obj: StatsObject, idx: number) => {
          const date = new Date(obj.timestamp * 1000);
          const display = createDate(date, resp.durationText);
          const dataPoint: [Tick, ...number[]] = [
            { v: splicedDists[idx], f: display },
          ];
          chartVars.forEach((axis) => {
            if (axis.toLowerCase() === "score") {
              dataPoint.push(+obj.score.toFixed(1));
            } else {
              dataPoint.push(obj[axis.toLowerCase() as keyof StatsObject]);
            }
          });
          tempData.push(dataPoint);
          ticks.push({ v: splicedDists[idx], f: display });
        });
        setData(tempData);
        setUserData(resp.stats); // Transfer state between components
        const newOptions = defaultOptions;
        newOptions.hAxis.ticks = ticks;
        setOptions(newOptions);
        setOpacity(1);
      })
      .catch((e) => {
        setLoadingText("Something went wrong. Try again later.");
        setError(true);
      });
  }, [chartDuration, chartVars, username]);
  return (
    <React.Fragment>
      <div className={styles.chartTitle}>
        Your {chartVarText} over {durationText}
      </div>
      <div className={styles.chart}>
        <div className={styles.chartLoadingText} style={{ opacity: +!opacity }}>
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
          selectFunction={changeChartDuration}
        />
        <div className={styles.chartSelectorSpacing}></div>
        <ChartSelector
          items={"Score/Incremental Stats/Ratios Only".split("/")}
          selectFunction={changeChartVariables}
        />
      </div>
    </React.Fragment>
  );
}

interface ChartSelectorProps {
  items: string[];
  selectFunction: (value: any) => void;
}

export function ChartSelector(props: ChartSelectorProps) {
  function changeValue(value: string) {
    if (props.items.includes("24h")) {
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
    } else {
      let chartVars;
      switch (value) {
        default: {
          chartVars = ["Score"];
          break;
        }
        case "Incremental Stats": {
          chartVars = ["Finals", "Beds", "Wins"];
          break;
        }
        case "Ratios Only": {
          chartVars = ["FKDR", "BBLR", "WLR"];
          break;
        }
      }
      props.selectFunction(chartVars);
    }
  }
  return (
    <div
      className={styles.chartSelector}
      key={props.items.slice(0, 2).join("")}
    >
      {props.items.map((item: string) => {
        return (
          <div
            className={styles.selectorItem}
            key={item}
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

export function createDate(
  date: Date,
  durationText: number,
  round: boolean = false
) {
  if (durationText > 3600 * 24 * 3) {
    const day = date.getDate();
    const month = findMonth(date.getMonth());
    return `${month} ${day}`;
  }
  const minute = round ? 30 : date.getMinutes();
  const hours =
    (date.getHours() + (round && date.getMinutes() >= 30 ? 1 : 0)) % 12 || 12;
  const type = date.getHours() < 12 || date.getHours() === 23 ? "am" : "pm";
  return `${hours}:${minute < 10 ? `0${minute}` : minute}${type}`;
}

async function getBreakingIndex(days: number, username: string) {
  const durationText = hour * days * 24;

  const user = await getUser(username);

  if (!user.stats) {
    throw new Error("something went wrong LMAO");
  }
  const stats = user.stats;
  const now = Math.floor(Date.now() / 1000);
  const dists = stats.map((obj: StatsObject) => now - obj.timestamp);
  let breakingIndex = 0;
  let broke = false;

  for (let i = dists.length - 1; i >= 0; i--) {
    if (dists[i] >= durationText) {
      breakingIndex = i + 1;
      broke = true;
      break;
    }
  }
  return { breakingIndex, stats, durationText, broke };
}
