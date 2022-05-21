import React from "react";
import styles from "./main.module.scss";

export default function Background() {
  return (
    <React.Fragment>
      <div className={styles.loginImage}></div>
      <div className={styles.loginCover}>
        <div className={styles.coverTitle}>Welcome back!</div>
        <div className={styles.coverSubtitle}>
          Log in to your account, or create an account through the sign up page.
        </div>
      </div>
    </React.Fragment>
  );
}
