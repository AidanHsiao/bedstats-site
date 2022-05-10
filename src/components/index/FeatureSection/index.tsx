import Image, { StaticImageData } from "next/image";
import styles from "./main.module.css";

interface FeatureProps {
  src: StaticImageData;
  title: string;
  subtitle: string;
}

export default function FeatureSection(props: FeatureProps) {
  return (
    <div className={styles.featureWrapper}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.widthLimiter}>
      <div className={styles.content}>
        <div className={styles.title}>{props.title}</div>
        <div className={styles.divider}></div>
        <div className={styles.subtitle}>{props.subtitle}</div>
      </div>
      <div className={styles.imageWrapper}>
        <div className={styles.logo}>
          <Image src={props.src} layout="fill" />
        </div>
      </div>
      </div>
    </div>
  );
}
