import styles from "./main.module.scss";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.title} style={{ paddingTop: 10 }}>
        About You
      </div>
      <div className={styles.link + " " + styles.selectedLink}>Overview</div>
      <div className={styles.link}>Your BedWars Habits</div>
      <div className={styles.title}>Settings</div>
      <div className={styles.link}>App Settings</div>
      <div className={styles.link}>Website Settings</div>
    </div>
  );
}
