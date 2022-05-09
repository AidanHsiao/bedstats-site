import { ReactElement } from "react";
import styles from "./main.module.css";
import DownloadButton from "../DownloadButton";
import NavBar from "../NavBar";

export default function Header(): ReactElement {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerImage}></div>
      <NavBar fixed={false} />
      <div className={styles.headerMain}>
        <div className={styles.headerBorder}></div>
        <div className={styles.headerContent}>
          <div className={styles.mainTitle}>BedStats v1.0.1</div>
          <div className={styles.subtitle}>
            The all-in-one app for <br />
            BedWars support.
          </div>
          <DownloadButton />
        </div>
      </div>
    </div>
  );
}
