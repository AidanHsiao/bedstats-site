import React, { ReactNode, useEffect, useState } from "react";
import styles from "./main.module.scss";
import Image from "next/image";
import backArrow from "../../../../public/signup/backArrow.png";
import { useRouter } from "next/router";
import sleep from "../../../../lib/sleep";

interface FormProps {
  title: string;
  subtitle: string;
  formTitle: string;
  errorMessage: string;
  imageBias: string;
  backPath: string;
  children: ReactNode;
  wrapperText?: string;
}

export default function SignUpForm(props: FormProps) {
  const [scale, setScale] = useState(1);
  const [width, setWidth] = useState(2000);
  const [height, setHeight] = useState(2000);
  const [imageBias, setImageBias] = useState(props.imageBias);

  useEffect(() => {
    setImageBias(props.imageBias);
  }, [props.imageBias]);

  useEffect(() => {
    setScale(Math.min(height / 600, width / 600));
  }, [width, height]);

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    });
  }, []);
  const router = useRouter();

  async function goBack() {
    if (imageBias === "left") {
      setImageBias("full");
    } else {
      setImageBias("fullRight");
    }
    await sleep(200);
    router.push(props.backPath);
  }

  return (
    <React.Fragment>
      <div className={styles.background}></div>
      <div
        className={styles.signInWrapper}
        style={
          imageBias.includes("ight") ? { flexDirection: "row-reverse" } : {}
        }
      >
        <div
          className={styles.wrapperText}
          style={{ opacity: imageBias.includes("full") ? 1 : 0 }}
        >
          {props.wrapperText}
        </div>
        <div
          className={styles.imageWrapper}
          style={
            imageBias.includes("full")
              ? { width: "100%", color: "transparent", textShadow: "none" }
              : imageBias.includes("ight")
              ? { right: 0 }
              : {}
          }
        >
          <div className={styles.image}></div>
          <div className={styles.imageTitle}>{props.title}</div>
          <div className={styles.imageSubtitle}>
            {props.subtitle.split("\n").map((str) => (
              <p key={str}>{str}</p>
            ))}
          </div>
        </div>
        <div
          className={styles.backArrow}
          style={
            imageBias === "right" || width < 1200
              ? { opacity: 1 }
              : {
                  filter: "invert(1)",
                  opacity: imageBias.includes("full") ? 0 : 1,
                }
          }
          onClick={goBack}
        >
          <Image src={backArrow} layout="fill" alt="Back Arrow" />
        </div>

        <div
          className={styles.form}
          style={
            imageBias.includes("full")
              ? {
                  transform: `scale(${scale})`,
                  display: "none",
                }
              : { transform: `scale(${scale})` }
          }
        >
          <div className={styles.formTitle}>{props.formTitle}</div>
          {props.children}
        </div>
        <div
          className={styles.errorMessage}
          style={props.errorMessage ? { bottom: 20, opacity: 1 } : {}}
        >
          {props.errorMessage}
        </div>
      </div>
    </React.Fragment>
  );
}
