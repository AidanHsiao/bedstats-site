import React from "react";
import styles from "./main.module.css";

export default function DropdownMenu() {
  return (
    <div className={styles.dropdown}>
      <DropdownIcon />
      <div className={styles.dropdownContentWrapper}>
        {/* Wrapper present to simplify DX and not to put margin-top 50px*/}
        <div className={styles.dropdownContent}>
          <DropdownSection
            title="About You"
            options={["Your Stats Overview", "Your BedWars Habits"]}
            width="700px"
          />
          <DropdownSection
            title="BedStats Settings"
            options={["App Settings", "Website Settings"]}
            width="400px"
          />
        </div>
      </div>
    </div>
  );
}

interface DropdownProps {
  title: string;
  options: string[];
  width?: string;
}

export function DropdownSection(props: DropdownProps) {
  return (
    <div className={styles.dropdownSection}>
      <div className={styles.dropdownTitle}>{props.title}</div>
      <div className={styles.dropdownList} style={{ width: props.width }}>
        {props.options.map((option) => (
          <div className={styles.dropdownItem} key={option}>
            {option}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DropdownIcon() {
  return (
    <div className={styles.dropdownIcon}>
      <div className={styles.dropdownLine}></div>
      <div className={styles.dropdownSpacing}></div>
      <div className={styles.dropdownLine}></div>
      <div className={styles.dropdownSpacing}></div>
      <div className={styles.dropdownLine}></div>
    </div>
  );
}
