import Image, { StaticImageData } from "next/image";
import styles from "./main.module.css";

interface FeatureProps {
  title: string;
  subtitle: string;
  src?: StaticImageData;
  static?: boolean;
  white?: boolean;
}

export default function FeatureSection(props: FeatureProps) {
  return (
    <div
      className={styles.featureWrapper}
      style={{
        backgroundImage: props.white
          ? "none"
          : "linear-gradient(135deg, rgba(162, 100, 219, 0.7), rgba(107, 32, 98, 0.7))",
      }}
    >
      {!props.white ? (
        <div
          className={styles.backgroundImage}
          style={{
            backgroundAttachment: props.static ? "fixed" : "absolute",
          }}
        ></div>
      ) : (
        ""
      )}
      <div
        className={styles.widthLimiter}
        style={
          props.white
            ? { color: "black", textShadow: "none" }
            : { color: "white", textShadow: "2px 2px 10px black" }
        }
      >
        <div
          className={styles.content}
          style={
            props.white
              ? {
                  width: "100%",
                  alignItems: "center",
                  textAlign: "center",
                  paddingLeft: 0,
                }
              : {}
          }
        >
          <div
            className={`${styles.title} ${
              props.white ? styles.textGradient : ""
            }`}
          >
            {props.title}
          </div>
          <div
            className={styles.divider}
            style={
              props.white
                ? {
                    backgroundImage: "linear-gradient(to right, black, purple)",
                    boxShadow: "none",
                  }
                : { backgroundColor: "white", boxShadow: "2px 2px 10px black" }
            }
          ></div>
          <div
            className={`${styles.subtitle} ${
              props.white ? styles.textGradient : ""
            }`}
            style={props.white ? { paddingInline: "20%" } : {}}
          >
            {props.subtitle}
          </div>
        </div>
        {!props.white && props.src ? (
          <div className={styles.imageWrapper}>
            <div className={styles.logo}>
              <Image src={props.src} layout="fill" />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
