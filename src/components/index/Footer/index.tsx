import Image from "next/image";
import { ReactElement } from "react";
import next from "../../../../public/nextjs.png";
import react from "../../../../public/react.png";
import styles from "./main.module.css";

export default function Footer(): ReactElement {
  return (
    <div className={styles.footer}>
      <div className={styles.footerText}>
        <div className={styles.builtWithText}>Built with </div>
        <div className={styles.nextImage}>
          <Image src={next} layout="fill" />
        </div>
        <div className={styles.andText}>and</div>
        <div className={styles.reactImage}>
          <Image src={react} layout="fill" />
        </div>
      </div>
    </div>
  );
}
