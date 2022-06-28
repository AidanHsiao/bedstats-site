import { toNamespacedPath } from "path";
import { ReactNode } from "react";
import styles from "./main.module.scss";

interface HabitsProps {
  title: string;
  children: ReactNode;
  topElement?: boolean;
}

export default function HabitsWrapper(props: HabitsProps) {
  return (
    <div
      className={styles.habitsWrapper}
      style={{ marginTop: 10 + 80 * +(props.topElement || false) }}
    >
      <div className={styles.title}>{props.title}</div>
      <data className={styles.data}>{props.children}</data>
    </div>
  );
}
