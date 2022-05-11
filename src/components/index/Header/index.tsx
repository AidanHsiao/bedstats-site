import { ReactElement, useEffect, useRef, useState } from "react";
import styles from "./main.module.css";
import DownloadButton from "../DownloadButton";
import NavBar from "../NavBar";

export default function Header(): ReactElement {
  const headerRef = useRef<HTMLDivElement>(null);

  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const observer = new IntersectionObserver(
      (e) => {
        setHeaderVisible(e[0].isIntersecting);
      },
      { threshold: 0.9 }
    );
    observer.observe(header);
  });

  return (
    <div className={styles.headerWrapper} ref={headerRef}>
      <div className={styles.headerImage}></div>
      <NavBar headerVisible={headerVisible} />
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
