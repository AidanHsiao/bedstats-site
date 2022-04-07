import Image, { StaticImageData } from "next/image";
import { ReactElement } from "react";
import styles from "./main.module.css";

export default function CardImage({
  src,
}: {
  src: StaticImageData;
}): ReactElement {
  return (
    <div className={styles.cardImage}>
      <Image src={src} layout="fill" />
    </div>
  );
}
