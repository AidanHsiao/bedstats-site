import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../../../public/logo.png";
import styles from "./main.module.css";
import Link from "next/link";

export default function NavBar({ headerVisible }: { headerVisible: boolean }) {
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
    <nav
      className={styles.navBar}
      style={{
        backgroundColor: !headerVisible ? "rgb(30, 30, 30)" : "transparent",
      }}
    >
      <div className={styles.logoWrapper}>
        <div className={styles.logo}>
          <Image src={logo} layout="fill" />
        </div>
        <div className={styles.logoText}>BedStats</div>
      </div>
      <div className={styles.links}>
        <div className={styles.link}>
          <Link href="/">
            <a>Home</a>
          </Link>
        </div>
        <div className={styles.link}>
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
        </div>
        <div className={styles.link}>
          <Link href="/about">
            <a>About</a>
          </Link>
        </div>
        <div className={styles.link}>
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </div>
        <div className={styles.login}>
          <div className={styles.loginButton}>
            <Link href="/login">
              <a>Log In</a>
            </Link>
          </div>
          <div className={styles.loginButton}>
            <Link href="/signup">
              <a>Sign Up</a>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={styles.expand}
        style={{
          right: opened ? 0 : "max(-270px, calc(-75vw))",
          backgroundColor:
            opened && headerVisible ? "rgb(50, 50, 50)" : "transparent",
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
          <div
            className={styles.arrowBackground}
            style={{
              backgroundColor: opened ? "rgb(50, 50, 50)" : "transparent",
            }}
          ></div>
        </div>
        <div className={styles.expandableContent}>
          <div className={styles.expandableSpacing}></div>
          <div
            className={styles.expandableBackground}
            style={{
              backgroundColor: opened ? "rgb(50, 50, 50)" : "transparent",
            }}
          >
            <div
              className={styles.expandableLinks}
              style={{ marginTop: headerVisible ? 0 : "40px" }}
            >
              <div className={styles.expandableLink}>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </div>
              <div className={styles.expandableLink}>
                <Link href="/dashboard">
                  <a>Dashboard</a>
                </Link>
              </div>
              <div className={styles.expandableLink}>
                <Link href="/about">
                  <a>About</a>
                </Link>
              </div>
              <div className={styles.expandableLink}>
                <Link href="/contact">
                  <a>Contact</a>
                </Link>
              </div>
            </div>
            <div className={styles.expandableLogin}>
              <div className={styles.expandableLoginItem}>
                <Link href="/login">
                  <a>Log In</a>
                </Link>
              </div>
              <div className={styles.expandableLoginItem}>
                <Link href="/signup">
                  <a>Sign Up</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
