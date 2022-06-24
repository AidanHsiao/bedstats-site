import { ReactNode } from "react";
import styles from "./main.module.scss";

interface HabitsProps {
  title: string;
  children: ReactNode;
}

export default function HabitsWrapper(props: HabitsProps) {
  return (
    <div className={styles.habitsWrapper}>
      <div className={styles.title}>{props.title}</div>
      <section className={styles.data}>{props.children}</section>
    </div>
  );
}
