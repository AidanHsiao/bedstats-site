import React from "react";
import styles from "./main.module.scss";

export default function ContactHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.title}>Contact Me!</div>
      <div className={styles.subtitle}>
        Fill out the form below to contact me. I'll reach out as soon as I can.
      </div>
    </div>
  );
}
