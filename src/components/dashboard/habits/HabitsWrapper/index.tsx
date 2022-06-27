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
      style={{ marginTop: props.topElement ? 90 : 40 }}
    >
      <div className={styles.title}>{props.title}</div>
      <section className={styles.data}>{props.children}</section>
    </div>
  );
}
