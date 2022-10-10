import { useState } from "react";
import { Equations } from "../../../../../lib/interfaces";
import styles from "./main.module.scss";

interface InputProps {
  name: string;
  value: string | number | boolean | Equations | string[];
  type: "boolean" | "enum" | "uuid" | "equations" | "number";
  isFirst: boolean;
  enumValues?: string[];
}

export function SettingsInput(props: InputProps) {
  const [value, setStateValue] = useState(props.value);

  function setValue(value: any) {
    setStateValue(value);
  }

  const name = `${props.name.charAt(0).toUpperCase()}${props.name.slice(1)}`;
  let input;
  switch (props.type) {
    case "boolean":
      input = (
        <select
          value={value as string}
          onChange={(e) => setValue(e.target.value)}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      );
      break;
    case "enum":
      const options = (props.enumValues as string[]).map((option) => (
        <option key={Math.random()}>{option}</option>
      ));
      input = (
        <select
          value={value as string}
          onChange={(e) => setValue(e.target.value)}
        >
          {options}
        </select>
      );
      break;
    case "uuid":
      input = (
        <input
          value={value as string}
          onChange={(e) => {
            if (!/^([a-f]|[0-9]|-){0,36}$/.test(e.target.value)) return;
            setValue(e.target.value);
          }}
        />
      );
      break;
    case "equations":
      input = <></>;
      break;
    case "number":
      input = (
        <input
          value={value as number}
          onChange={(e) => {
            if (!/^[0-9]*$/.test(e.target.value)) return;
            setValue(e.target.value);
          }}
        />
      );
      break;
    default:
      input = <></>;
      break;
  }
  return (
    <div
      className={styles.inputWrapper}
      style={{ marginTop: props.isFirst ? 90 : 0 }}
    >
      <div className={styles.inputLabel}>
        {name.match(/([A-Z][a-z]+)|([A-Z]+(?![a-z]))/g)?.join(" ")}
      </div>
      {input}
    </div>
  );
}
