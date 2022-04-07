import SignIn from "../SignIn";
import { ReactElement } from "react";
import styles from "./main.module.css";
import DownloadButton from "../DownloadButton";

export default function Header(): ReactElement {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerMain}>
        <div className={styles.mainTitle}>BedStats v1.0.1</div>
        <div className={styles.subtitle}>
          The all-in-one app for BedWars support.
        </div>
        <DownloadButton />
      </div>
      <div className={styles.headerSignIn}>
        <SignIn />
      </div>
    </div>
  );
}
