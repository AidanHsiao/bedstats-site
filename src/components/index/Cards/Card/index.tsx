import { ReactElement, useState } from "react";
import { StaticImageData } from "next/image";
import styles from "./main.module.css";
import CardImage from "../CardImage";

interface CardProps {
  src: StaticImageData;
  title: string;
  content: string;
}

export default function Card(props: CardProps): ReactElement {
  return (
    <div className={styles.card}>
      <CardImage src={props.src} />
      <div className={styles.cardData}>
        <div className={styles.cardTitle}>{props.title}</div>
        <div className={styles.cardText}>{props.content}</div>
      </div>
    </div>
  );
}
