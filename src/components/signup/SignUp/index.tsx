import { ReactElement, useState } from "react";

export default function SignUp(props: SignUpProps): ReactElement {
  let [tempPassword, setTempPassword] = useState("");
  let [buttonClass, setButtonClass] = useState("signUpNotReady");

  function checkIfValidButton(): void {
    if (!buttonClass) {
      props.submitFunction();
    }
  }

  function keyPress(event: React.KeyboardEvent): void {
    if (event.key === "Enter") {
      checkIfValidButton();
    }
  }

  return (
    <div
      style={{ opacity: props.opacity, zIndex: props.opacity }}
      className="formWrapper"
      onKeyDown={keyPress}
    >
      <div className="centralTitle">Sign Up to BedStats</div>
      <div className="form">
        <input
          id="username"
          type="text"
          value={props.name}
          spellCheck={false}
          onChange={(v) => {
            props.setUsername(v.target.value);
            if (
              props.password === tempPassword &&
              tempPassword &&
              v.target.value
            ) {
              setButtonClass("");
            } else {
              setButtonClass("signUpNotReady");
            }
          }}
          placeholder="Minecraft Username"
          autoComplete="off"
          required
        />
        <input
          id="password"
          type="password"
          value={props.password}
          onChange={(v) => {
            props.setPassword(v.target.value);
            if (v.target.value === tempPassword && tempPassword && props.name) {
              setButtonClass("");
            } else {
              setButtonClass(classes.signUpNotReady);
            }
          }}
          placeholder="Password"
          autoComplete="off"
          required
        />
        <input
          id="confirmPassword"
          type="password"
          value={tempPassword}
          onChange={(v) => {
            setTempPassword(v.target.value);
            if (
              v.target.value === props.password &&
              v.target.value &&
              props.name
            ) {
              setButtonClass("");
            } else {
              setButtonClass("signUpNotReady");
            }
          }}
          placeholder="Confirm Password"
          autoComplete="off"
          required
        />
        <button
          id="signup"
          onClick={checkIfValidButton}
          className={buttonClass}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

interface SignUpProps {
  submitFunction: () => void;
  opacity: number;
  name: string;
  setUsername: (name: string) => void;
  password: string;
  setPassword: (password: string) => void;
}
