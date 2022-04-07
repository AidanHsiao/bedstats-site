import { ReactElement, useState } from "react";
import styles from "./main.module.css";
import classes from "../../../common/globalclasses.module.css";

interface APIKeyProps {
  submitFunction: () => void;
  opacity: number;
  name: string;
  notNameFunc: () => void;
  apiKey: string;
  setApiKey: (apiKey: string) => void;
}

export default function APIKey(props: APIKeyProps): ReactElement {
  let [buttonClass, setButtonClass] = useState(classes.signUpNotReady);

  function submitAPIKey(buttonClass: string): void {
    if (!buttonClass) {
      props.submitFunction();
    }
  }

  function keyPress(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "Enter") {
      submitAPIKey(buttonClass);
    }
  }

  function checkKeyValidity(key: string): void {
    if (
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        key
      )
    ) {
      setButtonClass("");
    } else {
      setButtonClass(classes.signUpNotReady);
    }
  }

  return (
    <div
      style={{ opacity: props.opacity, zIndex: props.opacity }}
      className={classes.formWrapper}
    >
      <div className={classes.centralTitle}>Verify your identity</div>
      <div className={styles.centralSubtitle}>
        We can only verify your Minecraft username through Hypixel. Log on to
        Hypixel with your given Minecraft account, and run{" "}
        <span className={styles.apiBold}>/api new</span>. Since this step is
        required regardless, it can be used as an intermediary for
        authenticaion.
      </div>
      <div className={classes.form}>
        <input
          id="apikey"
          type="text"
          value={props.apiKey}
          onChange={(v) => {
            props.setApiKey(v.target.value);
            checkKeyValidity(v.target.value);
          }}
          onKeyDown={keyPress}
          placeholder="Enter Hypixel API Key"
          autoComplete="off"
          required
        />
        <button
          id="verifyAPI"
          onClick={() => {
            submitAPIKey(buttonClass);
          }}
          className={buttonClass}
          style={{ marginTop: "2vw" }}
        >
          Verify API Key
        </button>
        <div className={styles.notUser} onClick={props.notNameFunc}>
          Not {props.name}?
        </div>
      </div>
    </div>
  );
}
