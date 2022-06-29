import styles from "./main.module.scss";
import Image from "next/image";
import ImageBackground from "../../../../public/index/background.png";

export default function BackgroundImage() {
  return (
    <div className={styles.backgroundImage}>
      <Image
        src={ImageBackground}
        className={styles.image}
        layout="fill"
        objectFit="cover"
        alt="Background"
      />
      <div className={styles.backgroundGradient} />
    </div>
  );
}
