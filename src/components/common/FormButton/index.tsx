import styles from "./main.module.scss";

interface ButtonProps {
  text: string;
  disabled: boolean;
  handler: () => void;
  cancel?: boolean;
}

export default function FormButton(props: ButtonProps) {
  return (
    <div
      className={`${styles.button} ${props.disabled ? styles.disabled : ""} ${
        props.cancel ? styles.cancel : ""
      }`}
      onClick={props.handler}
    >
      {props.text}
    </div>
  );
}
