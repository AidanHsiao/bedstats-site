import { ReactElement, useState } from "react";
import Image from "next/image";
import styles from "./main.module.scss";
import downloadIcon from "../../../../public/index/downloadicon.png";

export default function DownloadButton(): ReactElement {
  let [iconFilter, setIconFilter] = useState(1);

  return (
    <a
      href="https://github.com/AidanHsiao/bedstats/releases/download/v1.0.1/BedStats.Setup.1.0.1.exe"
      target="_blank"
      rel="noopener noreferrer"
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
          <Image src={downloadIcon} layout="fill" alt="Download Button" />
        </div>
      </div>
    </a>
  );
}
