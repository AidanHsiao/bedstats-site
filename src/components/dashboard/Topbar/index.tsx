import styles from "./main.module.css";
import DropdownMenu from "./DropdownMenu";

export default function Topbar() {
  return (
    <div className={styles.topbar}>
      Stats Overview
      <DropdownMenu />
    </div>
  );
}
