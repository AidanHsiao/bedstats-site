import Image, { StaticImageData } from "next/image";
import styles from "./main.module.css";

interface FeatureProps {
  src: StaticImageData;
  title: string;
  subtitle: string;
  white?: boolean;
}

export default function FeatureSection(props: FeatureProps) {
  return (
    <div className={styles.featureWrapper} style={{backgroundImage: props.white ? "none" : "backgroundImage: linear-gradient(135deg, rgba(162, 100, 219, 0.7), rgba(107, 32, 98, 0.7));"}}>
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
