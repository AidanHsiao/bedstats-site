import { ReactElement, useState } from "react";
import Image from "next/image";
import styles from "./main.module.css";
import downloadIcon from "../../../../public/index/downloadicon.png";

export default function DownloadButton(): ReactElement {
  let [iconFilter, setIconFilter] = useState(1);

  return (
    <div
      className={styles.downloadButton}
      onMouseOver={() => setIconFilter(0)}
      onMouseLeave={() => setIconFilter(1)}
    >
      <div className={styles.downloadButtonText}>Download BedStats</div>
      <div className={styles.downloadButtonIconWrapper}>
        <div
          className={styles.downloadButtonIcon}
          style={{ filter: `invert(${iconFilter})` }}
        >
          <Image src={downloadIcon} layout="fill" />
        </div>
      </div>
    </div>
  );
}
