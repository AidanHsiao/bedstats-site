import { FormEvent, ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./main.module.css";
import getUser from "../../../../lib/db/getUser";
import { createHash } from "crypto";
import useUpdateEffect from "../../../../lib/hooks/useUpdateEffect";
import { useRouter } from "next/router";
import getUserByPass from "../../../../lib/db/getUserByPass";
import logo from "../../../../public/logo.png";
import Image from "next/image";

export default function SignIn(): ReactElement {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [pass, setPass] = useState("");
  const [loginAttempted, setLoginAttempted] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [errorMessage, setTrueErrorMessage] = useState("");

  function setErrorMessage(msg: string) {
    setTrueErrorMessage(msg);
    setTimeout(() => setTrueErrorMessage(""), 3000);
  }

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoggingIn(true);
    const user = await getUser(username);
    if (!user.user) {
      setErrorMessage("That account doesn't exist.");
      setLoggingIn(false);
      return;
    }
    const truePassword = user.user.password;
    const inputPassword = createHash("sha256")
      .update(`${username.toLowerCase()}${password}`)
      .digest("hex");
    if (truePassword !== inputPassword) {
      setErrorMessage("Invalid password.");
      setLoggingIn(false);
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
      loginHandler();
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

  const router = useRouter();

  async function loginHandler() {
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
      className={styles.signInSidebar}
      style={{ display: loginAttempted ? "flex" : "none" }}
    >
      <div className={styles.signInImage}></div>
      <div className={styles.signInCover}>
        <div className={styles.coverTitle}>Welcome back!</div>
        <div className={styles.coverSubtitle}>
          Log in to your account, or create an account through the sign up page.
        </div>
      </div>
      <div className={styles.signInWrapper}>
        <div
          className={styles.errorMessage}
          style={
            errorMessage
              ? { bottom: "-50px", opacity: 1 }
              : { bottom: "-100px", opacity: 0 }
          }
        >
          {errorMessage}
        </div>
        <div className={styles.logo} onClick={() => router.push("/")}>
          <Image src={logo} layout="fill" />
        </div>
        <span className={styles.signInTitle}>Log in to BedStats</span>
        <form className={styles.signIn} onSubmit={(e) => login(e)}>
          <input
            id="username"
            type="text"
            placeholder="Username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.username}
            required
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.password}
            required
          />
          <div className={styles.rememberMe}>
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span
              style={{ paddingLeft: "5px" }}
              onClick={() => {
                setRememberMe(!rememberMe);
              }}
            >
              Remember Me
            </span>
          </div>
          <button
            id="signin"
            type="submit"
            style={{
              opacity: loggingIn ? 0.7 : 1,
              cursor: loggingIn ? "not-allowed" : "pointer",
            }}
            className={loggingIn ? styles.loggingIn : ""}
          >
            Sign{loggingIn ? "ing" : ""} In{loggingIn ? "..." : ""}
          </button>
        </form>
        <span className={styles.accountText}>
          Don't have an account?{" "}
          <Link href="/signup">
            <a className={styles.createAccount}>Create an account</a>
          </Link>
        </span>
      </div>
    </div>
  );
}
