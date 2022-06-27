import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../../../public/logo.png";
import styles from "./main.module.scss";
import Link from "next/link";
import getPass from "../../../../lib/getPass";
import React from "react";
import getUserByPass from "../../../../lib/db/getUserByPass";
import { useRouter } from "next/router";

export default function NavBar({ headerVisible }: { headerVisible: boolean }) {
  const [opened, setOpened] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (!window) return;
    const pass = getPass();
    if (pass) setShowLogin(false);
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
          <Image src={logo} layout="fill" alt="BedStats Logo" />
        </div>
        <div className={styles.logoText}>BedStats</div>
      </div>
      <div className={styles.links}>
        <NavLink route="Home" />
        <NavLink route="Dashboard" />
        <NavLink route="About" />
        <NavLink route="Contact" />
        <div className={styles.login}>
          {showLogin ? (
            <React.Fragment>
              <NavLink route="Log In" />
              <NavLink route="Sign Up" />
            </React.Fragment>
          ) : (
            <NavLink route="Log Out" />
          )}
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
              style={{ marginTop: +!headerVisible * 40 }}
            >
              <NavLink route="Home" />
              <NavLink route="Dashboard" />
              <NavLink route="About" />
              <NavLink route="Contact" />
            </div>
            <div className={styles.expandableLogin}>
              {showLogin ? (
                <React.Fragment>
                  <NavLink route="Log In" />
                  <NavLink route="Sign Up" />
                </React.Fragment>
              ) : (
                <NavLink route="Log Out" />
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

interface NavLinkProps {
  route: string;
}

export function NavLink(props: NavLinkProps) {
  const routeName = props.route.replace(/ /g, "").toLowerCase();

  const href = `/${props.route !== "Home" ? routeName : ""}`;

  const router = useRouter();

  async function attemptLogin() {
    const pass = getPass();
    const user = await getUserByPass(pass);
    if (!user.password) {
      router.push("/login");
      return;
    }
    router.push("/dashboard");
  }

  return (
    <div className={styles.link}>
      {props.route === "Dashboard" ? (
        <div onClick={attemptLogin}>{props.route}</div>
      ) : (
        <Link href={href}>
          <a>{props.route}</a>
        </Link>
      )}
    </div>
  );
}
