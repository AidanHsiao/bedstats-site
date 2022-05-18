import { ReactElement } from "react";
import styles from "./main.module.scss";

export default function ProgressBar({
  value,
}: {
  value: number;
}): ReactElement {
  return (
    <div className={styles.progressWrapper}>
      <div className={styles.progressText}>
        <div className={styles.progressTextItem}>Sign Up</div>
        <div className={styles.progressTextItem}>Verify Username</div>
        <div className={styles.progressTextItem}>Add Friends</div>
        <div className={styles.progressTextItem}>Finished!</div>
      </div>
      <div className={styles.progressBar}>
        <div
          className={styles.progressBarFiller}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}
