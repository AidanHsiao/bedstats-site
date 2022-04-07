import { ReactElement, useState } from "react";
import Image from "next/image";
import styles from "./main.module.css";
import downloadIcon from "../../../../public/downloadicon.png";

export default function DownloadButton(): ReactElement {
  let [iconFilter, setIconFilter] = useState("invert(1)");

  function disableFilter(): void {
    setIconFilter("invert(0)");
  }

  function enableFilter(): void {
    setIconFilter("invert(1)");
  }

  return (
    <div
      className={styles.downloadButton}
      onMouseOver={disableFilter}
      onMouseLeave={enableFilter}
    >
      <div className={styles.downloadButtonText}>Download BedStats</div>
      <div className={styles.downloadButtonIconWrapper}>
        <div
          className={styles.downloadButtonIcon}
          style={{ filter: iconFilter }}
        >
          <Image src={downloadIcon} layout="fill" />
        </div>
      </div>
    </div>
  );
}
