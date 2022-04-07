import { ReactElement, useState } from "react";
import { StaticImageData } from "next/image";
import styles from "./main.module.css";
import CardImage from "../CardImage";

interface CardProps {
  src: StaticImageData;
  imageLoc: string;
  title: string;
  content: string;
}

export default function Card(props: CardProps): ReactElement {
  const left = props.imageLoc === "left" ? <CardImage src={props.src} /> : "";
  const right = props.imageLoc === "right" ? <CardImage src={props.src} /> : "";

  return (
    <div className={styles.card}>
      {left}
      <div className={styles.cardData}>
        <div className={styles.cardTitle}>{props.title}</div>
        <div className={styles.cardText}>{props.content}</div>
      </div>
      {right}
    </div>
  );
}
