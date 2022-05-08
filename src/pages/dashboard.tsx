import React from "react";
import ChartWrapper from "../components/dashboard/ChartWrapper/ChartWrapper";
import styles from "../styles/temp.module.css";

export default function Page() {
  return (
    <React.Fragment>
      <Sidebar />
      <div className={styles.main}>
        <ChartWrapper />
      </div>
    </React.Fragment>
  );
}

export function Sidebar() {
  return <div className={styles.sidebar}></div>;
}

export function ChartTitle() {
  return (
    <div className={styles.chartTitle}>Your stats over the last 7 days</div>
  );
}
