import { FormEvent, ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./main.module.css";
import getUser from "../../../../lib/db/getUser";
import { createHash, randomBytes } from "crypto";
import useUpdateEffect from "../../../../lib/hooks/useUpdateEffect";
import { useRouter } from "next/router";
import getUserByPass from "../../../../lib/db/getUserByPass";

export default function SignIn(): ReactElement {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [pass, setPass] = useState("");
  const [loginAttempted, setLoginAttempted] = useState(false);

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const user = await getUser(username);
    if (!user.user) {
      console.log("account doesn't exist");
      return;
    }
    const truePassword = user.user.password;
    const inputPassword = createHash("sha256")
      .update(`${username.toLowerCase()}${password}`)
      .digest("hex");
    if (truePassword !== inputPassword) {
      console.log("shit password");
      return;
    }
    setPass(
      createHash("sha256")
        .update(`${username.toLowerCase()}${password}`)
        .digest("hex")
    );
  }

  useUpdateEffect(async () => {
    if (!window || !pass) return;
    if (rememberMe === true) {
      localStorage.setItem("username", username);
      localStorage.setItem("pass", pass);
      return;
    }
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("pass", pass);
    loginHandler();
  }, [pass]);

  useEffect(() => {
    if (!window || loginAttempted) return;
    loginHandler();
  });

  async function loginHandler() {
    const router = useRouter();
    try {
      const pass =
        sessionStorage.getItem("pass") || localStorage.getItem("pass");
      if (!pass) throw new Error("no pass");
      const user = await getUserByPass(pass);
      if (!user.password) throw new Error("invalid pass");
      router.push("/dashboard");
    } catch (e) {
      setLoginAttempted(true);
    }
  }

  return (
    <div
      className={styles.signInWrapper}
      style={{ display: loginAttempted ? "flex" : "none" }}
    >
      <div className={styles.signInImage}></div>
      <span className={styles.signInTitle}>Log In to BedStats</span>
      <form className={styles.signIn} onSubmit={(e) => login(e)}>
        <input
          id="username"
          type="text"
          placeholder="Username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className={styles.rememberMe}>
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <span style={{ paddingLeft: "5px" }}>Remember Me</span>
        </div>
        <button id="signin" type="submit">
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
