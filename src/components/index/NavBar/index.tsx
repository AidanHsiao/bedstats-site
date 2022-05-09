import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../../../public/logo.png";
import styles from "./main.module.css";
import Link from "next/link";

export default function NavBar({ fixed }: { fixed: boolean }) {
  const [opened, setOpened] = useState(false);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 650 && !showNav) {
        setShowNav(true);
      }
      if (window.scrollY < 650 && showNav) {
        setShowNav(false);
      }
    });
  }, []);

  return (
    <div
      className={styles.navBar}
      style={{ position: fixed ? "fixed" : "absolute" }}
    >
      <div className={styles.logoWrapper}>
        <div className={styles.logo}>
          <Image src={logo} layout="fill" />
        </div>
        <div className={styles.logoText}>BedStats</div>
      </div>
      <div className={styles.links}>
        <div className={styles.link}>Home</div>
        <div className={styles.link}>
          <Link href="/dashboard">Dashboard</Link>
        </div>
        <div className={styles.link}>About</div>
        <div className={styles.link}>Contact</div>
        <div className={styles.login}>
          <div className={styles.loginButton}>
            <Link href="/login">Log In</Link>
          </div>
          <div className={styles.loginButton}>
            <Link href="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
      <div
        className={styles.expand}
        style={{
          right: opened ? 0 : -270,
          backgroundColor: opened ? "rgba(150, 0, 255, 0.5)" : "none",
        }}
      >
        <div className={styles.arrowWrapper}>
          <div
            className={styles.arrow}
            onClick={() => {
              if (opened) {
                setOpened(false);
                return;
              }
              setOpened(true);
            }}
            style={{ transform: opened ? "scaleX(-1)" : "scaleX(1)" }}
          >
            &lt;
          </div>
        </div>
        <div className={styles.expandableContent}></div>
      </div>
    </div>
  );
}
