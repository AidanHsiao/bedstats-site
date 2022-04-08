import { ReactElement } from "react";
import background from "../../../../public/background.png";
import Image from "next/image";
import styles from "./main.module.css";

export default function BackgroundImage(): ReactElement {
  return (
    <div className={styles.backgroundImage}>
      <Image src={background} layout="fill" priority={true} />
    </div>
  );
}
