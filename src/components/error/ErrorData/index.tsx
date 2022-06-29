import styles from "./main.module.scss";

interface ErrorProps {
  number: 404 | 500;
  label: string;
  description?: string;
}

export default function ErrorData(props: ErrorProps) {
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.errorType}
        style={{ color: props.number === 404 ? "#ffc4c4" : "#ff0000" }}
      >
        <div className={styles.errorNumber}>{props.number}</div>
        <div className={styles.errorLabel}>{props.label}</div>
      </div>
      <div className={styles.errorDescription}>
        <div className={styles.errorDescription}>{props.description}</div>
      </div>
    </div>
  );
}
