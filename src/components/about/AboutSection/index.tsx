import styles from "./main.module.scss";
import Image from "next/image";
import githubLogo from "../../../../public/about/githubLogo.png";
import linkedinLogo from "../../../../public/about/linkedinLogo.png";

interface AboutProps {
  title: string;
  text: string;
  background?: true;
  follow?: true;
}

export default function AboutSection(props: AboutProps) {
  return (
    <div
      className={styles.header}
      style={
        props.background
          ? {
              backgroundImage:
                "linear-gradient(135deg, rgba(162, 100, 219, 0.55), rgba(107, 32, 98, 0.55))",
              color: "white",
              textShadow: "2px 2px 20px black",
            }
          : {
              background: "none",
            }
      }
    >
      {props.background && <div className={styles.headerImage}></div>}
      <div className={styles.title}>{props.title}</div>
      <div className={styles.text}>
        {props.text}
        <br />
      </div>
      {props.follow && <Links />}
    </div>
  );
}

export function Links() {
  return (
    <div className={styles.links}>
      <a
        className={styles.logo + " " + styles.githubLogo}
        href="https://github.com/AidanHsiao"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={githubLogo} layout="fill"></Image>
      </a>
      <a
        className={styles.logo}
        href="https://www.linkedin.com/in/aidan-hsiao-9b18a223a/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={linkedinLogo} layout="fill"></Image>
      </a>
    </div>
  );
}
