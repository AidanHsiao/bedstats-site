import { ReactElement } from "react";
import styles from "./main.module.scss";

export default function Finished({
  opacity,
  dashboardFunc,
}: {
  opacity: number;
  dashboardFunc: () => void;
}): ReactElement {
  return (
    <div
      className={styles.finishedWrapper}
      style={{ opacity: opacity, zIndex: opacity }}
    >
      <div className={styles.finishedTitle}>You're all set!</div>
      <div className={styles.finishedSubtitle}>
        With a BedStats account, all of your settings and friends will be saved
        between clients. Additionally, you can view your own stats as a graph on
        the BedStats web application. Use the dashboard to customize your
        settings without a client, and view much more.
      </div>
      <div
        className={styles.finishedButton}
        style={{ cursor: opacity ? "pointer" : "default" }}
        onClick={dashboardFunc}
      >
        Go to Dashboard
      </div>
    </div>
  );
}
