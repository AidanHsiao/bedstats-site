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

  let [cardData, setCardData] = useState({
    width: "70vw",
    height: "16vw",
    fontSize: "1.45vw",
  });

  function expandCard(): void {
    setCardData({
      width: "75vw",
      height: "17vw",
      fontSize: "1.57vw",
    });
  }

  function deflateCard(): void {
    setCardData({
      width: "70vw",
      height: "16vw",
      fontSize: "1.45vw",
    });
  }

  return (
    <div
      className={styles.card}
      onMouseOver={expandCard}
      onMouseLeave={deflateCard}
      style={{ width: cardData.width, height: cardData.height }}
    >
      {left}
      <div className={styles.cardData}>
        <div className={styles.cardTitle}>{props.title}</div>
        <div
          className={styles.cardText}
          style={{ fontSize: cardData.fontSize }}
        >
          {props.content}
        </div>
      </div>
      {right}
    </div>
  );
}
