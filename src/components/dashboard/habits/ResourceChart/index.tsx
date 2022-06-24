import { ResourceRatio } from "../../../../../lib/interfaces";
import styles from "./main.module.scss";

interface ResourceProps {
  resourceRatio: ResourceRatio;
  title: string;
}

export default function ResourceChart(props: ResourceProps) {
  return (
    <div className={styles.resourceWrapper}>
      <div className={styles.resourceValues}>
        <div
          className={styles.resourceItem}
          style={{
            height: `${props.resourceRatio?.forge * 100 || 0}%`,
            backgroundColor: "#fa0",
          }}
        ></div>
        <div
          className={styles.resourceItem}
          style={{
            height: `${props.resourceRatio?.diamond * 100 || 0}%`,
            backgroundColor: "#0ff",
          }}
        ></div>
        <div
          className={styles.resourceItem}
          style={{
            height: `${props.resourceRatio?.emerald * 100 || 0}%`,
            backgroundColor: "#0f0",
          }}
        ></div>
      </div>
      <div className={styles.title}>{props.title}</div>
    </div>
  );
}
