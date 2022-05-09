import { ReactElement } from "react";
import Link from "next/link";
import styles from "./main.module.css";

export default function SignIn(): ReactElement {
  return (
    <div className={styles.signInWrapper}>
      <div className={styles.signInImage}></div>
      <span className={styles.signInTitle}>Log In to BedStats</span>
      <form className={styles.signIn}>
        <input
          id="username"
          type="text"
          placeholder="Username"
          autoComplete="off"
          required
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          autoComplete="off"
          required
        />
        <div className={styles.rememberMe}>
          <input id="remember-me" type="checkbox" />
          <span style={{ paddingLeft: "5px" }}>Remember Me</span>
        </div>
        <button id="signin" onClick={(e) => e.preventDefault()}>
          Sign In
        </button>
      </form>
      <span className={styles.accountText}>
        Don't have an account?{" "}
        <Link href="/signup">
          <a className={styles.createAccount}>Create an account</a>
        </Link>
      </span>
    </div>
  );
}
