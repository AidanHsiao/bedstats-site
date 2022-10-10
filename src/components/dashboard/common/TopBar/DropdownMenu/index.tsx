import { useRouter } from "next/router";
import React from "react";
import styles from "./main.module.scss";

const sections = [
  [
    {
      id: "overview",
      name: "Your Stats Overview",
    },
    {
      id: "habits",
      name: "Your Bedwars Habits",
    },
  ],
  [
    {
      id: "settings",
      name: "General Settings",
    },
    {
      id: "site_settings",
      name: "Website Settings",
    },
  ],
];

export default function DropdownMenu() {
  return (
    <div className={styles.dropdown}>
      <DropdownIcon />
      <div className={styles.dropdownContentWrapper}>
        <div className={styles.dropdownContent}>
          <DropdownSection
            title="About You"
            options={sections[0]}
            width={700}
          />
          <DropdownSection
            title="BedStats Settings"
            options={sections[1]}
            width={400}
          />
        </div>
      </div>
    </div>
  );
}

interface SectionProps {
  id: string;
  name: string;
}

interface DropdownProps {
  title: string;
  options: SectionProps[];
  width?: number;
}

export function DropdownSection(props: DropdownProps) {
  const router = useRouter();

  return (
    <div className={styles.dropdownSection}>
      <div className={styles.dropdownTitle}>{props.title}</div>
      <div className={styles.dropdownList} style={{ width: props.width }}>
        {props.options.map((option) => (
          <div
            className={styles.dropdownItem}
            key={Math.random()}
            onClick={() => {
              router.push(
                `/dashboard${option.id !== "overview" ? `/${option.id}` : ""}`
              );
            }}
          >
            {option.name}
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
