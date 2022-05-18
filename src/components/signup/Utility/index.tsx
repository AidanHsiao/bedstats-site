import { ReactElement } from "react";
import styles from "./main.module.scss";

interface UtilityProps {
  coverIndex: number;
  message: string;
  errorVisible: boolean;
  errorMessage: string;
}

export default function Utility(props: UtilityProps): ReactElement {
  return (
    <div>
      <div
        className={styles.cover}
        style={{
          zIndex: props.coverIndex,
          opacity: props.coverIndex === 2 ? 1 : 0,
        }}
      >
        {props.message}
      </div>
      <div
        className={styles.errorMessage}
        style={{ right: props.errorVisible ? "2vw" : "-32vw" }}
      >
        {props.errorMessage}
      </div>
    </div>
  );
}
