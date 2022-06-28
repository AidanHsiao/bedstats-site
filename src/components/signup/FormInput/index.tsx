import React, { Dispatch, SetStateAction } from "react";
import styles from "./main.module.scss";

interface InputProps {
  title: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>> | ((value: any) => void);
  enterText?: boolean;
  enterKey?: () => void;
  password?: boolean;
}

export default function FormInput(props: InputProps) {
  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputTitle}>{props.title}</div>
      <input
        type={props.password ? "password" : "text"}
        className={styles.formInput}
        placeholder={`${props.enterText ? "Enter " : ""}${props.title}`}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && props.enterKey) props.enterKey();
        }}
      ></input>
    </div>
  );
}
