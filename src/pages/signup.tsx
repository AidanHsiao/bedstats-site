import styles from "../styles/signup.module.css";
import classes from "../common/globalclasses.module.css";
import React, { useRef, useState, useEffect, ReactElement } from "react";
import { createHash } from "crypto";
import { useRouter } from "next/router";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDoc,
  updateDoc,
  setDoc,
  doc,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

const scale = 1;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const progress1 = 9;
const progress2 = 36;
const progress3 = 65;
const progress4 = 92;

export default function Home(): ReactElement {
  let [opacity1, setOpacity1] = useState(1);
  let [opacity2, setOpacity2] = useState(0);
  let [opacity3, setOpacity3] = useState(0);
  let [opacity4, setOpacity4] = useState(0);
  let [progress, setProgress] = useState(10);
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [apiKey, setApiKey] = useState("");
  let [message, setMessage] = useState("Verifying Username...");
  let [coverIndex, setCoverIndex] = useState(-1);
  let [uuid, setUuid] = useState("");
  let [errorMessage, setErrorMessage] = useState("");
  let [errorVisible, setErrorVisibility] = useState(0);
  let [friendsArr, setFriendsArr] = useState([""]);
  let [importButton, setImportButton] = useState(styles.friendsImport);

  interface friendsItem {
    username: string;
    uuid: string;
  }

  let friendsList: friendsItem[] = [];

  async function checkSignUpValidity() {
    setMessage("Verifying Username...");
    setCoverIndex(2);
    const playerData = await fetch(
      `https://api.ashcon.app/mojang/v2/user/${username}`
    )
      .then((res) => res.json())
      .catch((e) => {});
    setCoverIndex(-1);
    if (playerData?.error || !playerData) {
      if (!playerData) {
        setErrorMessage(
          "Connection lost. Make sure you are connected to the internet."
        );
      } else {
        setErrorMessage(
          "That username was not found in the Mojang database. Try again."
        );
      }
      setErrorVisibility(1);
      setTimeout(() => setErrorVisibility(0), 5000);
      return;
    }
    const existingUser = await getDoc(doc(db, "users", playerData.uuid));
    // @ts-ignore: Document doesn't exist on existingUser, but it actually does
    if (existingUser._document) {
      setErrorMessage(
        "That user already exists. Please log in instead, or reset your password."
      );
      setErrorVisibility(1);
      setTimeout(() => setErrorVisibility(0), 5000);
      return;
    }
    setUuid(playerData.uuid);
    setOpacity1(0);
    setProgress(progress2);
    await sleep(200);
    setUsername(playerData.username);
    setOpacity2(1);
  }

  async function notName() {
    setOpacity2(0);
    setProgress(progress1);
    await sleep(200);
    setOpacity1(1);
  }

  async function checkAPIKeyValidity() {
    setMessage("Validating API Key...");
    setCoverIndex(2);
    const keyData = await fetch(`https://api.hypixel.net/key?key=${apiKey}`)
      .then((res) => res.json())
      .catch((e) => {});
    if (!keyData?.success || !keyData) {
      setErrorMessage(
        "The inputted API key is invalid. Check that it's spelt correctly."
      );
      setErrorVisibility(1);
      setTimeout(() => setErrorVisibility(0), 5000);
      return;
    }
    const keyUUID = keyData.record.owner;
    if (keyUUID !== uuid) {
      setErrorMessage("This key's owner doesn't match with your username.");
      setErrorVisibility(1);
      setCoverIndex(-1);
      setTimeout(() => setErrorVisibility(0), 5000);
      return;
    }
    setOpacity2(0);
    setProgress(progress3);
    setMessage("Downloading Friends Data...");
    const friends = await fetch(
      `https://api.hypixel.net/friends?key=${apiKey}&uuid=${uuid}`
    )
      .then((res) => res.json())
      .catch((e) => {});
    const friendsData = filterFriends(friends);
    setFriendsArr(friendsData);
    if (!friendsData.length) {
      setImportButton(`${styles.friendsImport} ${styles.friendsImportOff}`);
    } else {
      setImportButton(styles.friendsImport);
    }
    setCoverIndex(-1);
    setOpacity3(1);
  }

  async function importFriends() {
    let searched = 0;
    setMessage(`Importing Friends (${searched}/${friendsArr.length})`);
    setCoverIndex(2);
    friendsArr.forEach(async (uuid) => {
      const user = await fetch(`https://api.ashcon.app/mojang/v2/user/${uuid}`)
        .then((res) => res.json())
        .catch((e) => {});
      friendsList.push({ username: user.username, uuid: uuid });
      console.log(friendsList);
      searched++;
      setMessage(`Importing Friends (${searched}/${friendsArr.length})`);
      if (searched === friendsArr.length) {
        finished();
      }
    });
  }

  async function finished() {
    setOpacity3(0);
    setProgress(progress4);
    setMessage(`Uploading To Database...`);
    const hash = createHash("sha256")
      .update(`${username.toLowerCase()}${password}`)
      .digest("hex");
    const upload = await setDoc(doc(db, "users", uuid), {
      username: username,
      password: hash,
      hypixelAPIKey: apiKey,
      friends: friendsList,
      settings: {
        theme: "Midnight",
        animationEnabled: true,
        animationRate: "40 FPS",
        hypixelAPIKey: apiKey,
        pollingRate: "1s",
        loggingConfig: "Vanilla",
        scoreCutoff: 1500,
        scoreConstant: 1,
        equations: {
          stars: "x ^ 0.65 * 10",
          fkdr: "(-1 * (1000 / (x + 10)) + 2 * x + 100) * 10",
          bblr: "x ^ 1.5 * 100",
          wlr: "x ^ 1.5 * 100",
          finals: "x / 12",
          beds: "x / 6",
          wins: "x / 3",
          fkdrMargin: 10,
          bblrMargin: 10,
          wlrMargin: 10,
          fkdrSecond: "x ^ 2 + 25 * x + 350",
          bblrSecond: "450 * x - 134",
          wlrSecond: "450 * x - 134",
        },
      },
    });
    setCoverIndex(-1);
    setOpacity4(1);
  }
  const router = useRouter();

  async function goToDash() {
    if (opacity4 === 0) return;
    setOpacity4(0);
    setProgress(100);
    setMessage("");
    await sleep(200);
    router.push("/dashboard");
  }

  return (
    <div
      className={classes.screenContent}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className={styles.cover}
        style={{
          zIndex: coverIndex,
          opacity: coverIndex === 2 ? 1 : 0,
        }}
      >
        {message}
      </div>
      <div
        className={styles.errorMessage}
        style={{ right: errorVisible ? "2vw" : "-32vw" }}
      >
        {errorMessage}
      </div>
      <div
        className={styles.signUpWrapper}
        style={{ transform: `scale(${scale})` }}
      >
        <ProgressBar value={progress} />
        <SignUp
          submitFunction={checkSignUpValidity}
          opacity={opacity1}
          name={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
        <APIKey
          submitFunction={checkAPIKeyValidity}
          opacity={opacity2}
          name={username}
          notNameFunc={notName}
          apiKey={apiKey}
          setApiKey={setApiKey}
        />
        <FriendsData
          opacity={opacity3}
          friends={friendsArr}
          importButton={importButton}
          import={importFriends}
          continue={finished}
        />
        <Finished opacity={opacity4} dashboardFunc={goToDash} />
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

export function SignUp(props: SignUpProps): ReactElement {
  let [tempPassword, setTempPassword] = useState("");
  let [buttonClass, setButtonClass] = useState(styles.signUpNotReady);

  function checkIfValidButton() {
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
      className={styles.formWrapper}
      onKeyDown={keyPress}
    >
      <div className={styles.centralTitle}>Sign Up to BedStats</div>
      <div className={styles.form}>
        <input
          id="username"
          type="text"
          value={props.name}
          onChange={(v) => {
            props.setUsername(v.target.value);
            if (
              props.password === tempPassword &&
              tempPassword &&
              v.target.value
            ) {
              setButtonClass("");
            } else {
              setButtonClass(styles.signUpNotReady);
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
              setButtonClass(styles.signUpNotReady);
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
              setButtonClass(styles.signUpNotReady);
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

interface APIKeyProps {
  submitFunction: () => void;
  opacity: number;
  name: string;
  notNameFunc: () => void;
  apiKey: string;
  setApiKey: (apiKey: string) => void;
}
export function APIKey(props: APIKeyProps): ReactElement {
  let [buttonClass, setButtonClass] = useState(styles.signUpNotReady);

  function submitAPIKey(buttonClass: string) {
    if (!buttonClass) {
      props.submitFunction();
    }
  }

  function keyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      submitAPIKey(buttonClass);
    }
  }

  function checkKeyValidity(key: string) {
    if (
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        key
      )
    ) {
      setButtonClass("");
    } else {
      setButtonClass(styles.signUpNotReady);
    }
  }

  return (
    <div
      style={{ opacity: props.opacity, zIndex: props.opacity }}
      className={styles.formWrapper}
    >
      <div className={styles.centralTitle}>Verify your identity</div>
      <div className={styles.centralSubtitle}>
        We can only verify your Minecraft username through Hypixel. Log on to
        Hypixel with your given Minecraft account, and run{" "}
        <span className={styles.apiBold}>/api new</span>. Since this step is
        required regardless, it can be used as an intermediary for
        authenticaion.
      </div>
      <div className={styles.form}>
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

interface FriendsProps {
  opacity: number;
  friends: string[];
  importButton: string;
  import: () => void;
  continue: () => void;
}

export function FriendsData(props: FriendsProps): ReactElement {
  return (
    <div
      className={styles.friendsWrapper}
      style={{ opacity: props.opacity, zIndex: props.opacity }}
    >
      <div className={styles.friendsCount}>
        You have {props.friends.length <= 50 ? props.friends.length : "50+"}{" "}
        friends.
      </div>
      <div className={styles.friendsText}>
        {props.friends.length
          ? `Would you like to import your
        ${props.friends.length > 50 ? " first 50 " : " "}friends into the
        BedStats friends database?`
          : "L + Ratio + Stay Mad + Hoes Mad + Basic + Skill Issue + You Fell Off + The Audacity + Touch Grass"}
        <br />
      </div>
      <div className={styles.friendsSubtitle}>
        {props.friends.length
          ? "This allows for automatic comparison of your friends, using the BedStats Leaderboard."
          : "Feels bad, get some friends first. Then you can compare them with BedStats! :D"}
      </div>
      <div className={styles.friendsOptions}>
        <div className={props.importButton} onClick={props.import}>
          {props.friends.length ? "Yes, Import Friends" : "Unable to Import"}
        </div>
        <div className={styles.friendsDeny} onClick={props.continue}>
          {props.friends.length ? "No, Keep It Empty For Now" : "Continue"}
        </div>
      </div>
    </div>
  );
}

export function Finished({
  opacity,
  dashboardFunc,
}: {
  opacity: number;
  dashboardFunc: () => void;
}): ReactElement {
  return (
    <div
      className={styles.finishedWrapper}
      style={{ opacity: opacity, zIndex: opacity }}
    >
      <div className={styles.finishedTitle}>You're all set!</div>
      <div className={styles.finishedSubtitle}>
        With a BedStats account, all of your settings and friends will be saved
        between clients. Additionally, you can view your own stats as a graph on
        the BedStats web application. Use the dashboard to customize your
        settings without a client, and view much more.
      </div>
      <div
        className={styles.finishedButton}
        style={{ cursor: opacity ? "pointer" : "default" }}
        onClick={dashboardFunc}
      >
        Go to Dashboard
      </div>
    </div>
  );
}

export function ProgressBar({ value }: { value: number }): ReactElement {
  return (
    <div className={styles.progressWrapper}>
      <div className={styles.progressText}>
        <div className={styles.progressTextItem}>Sign Up</div>
        <div className={styles.progressTextItem}>Verify Username</div>
        <div className={styles.progressTextItem}>Add Friends</div>
        <div className={styles.progressTextItem}>Finished!</div>
      </div>
      <div className={styles.progressBar}>
        <div
          className={styles.progressBarFiller}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}

interface HypixelFriends {
  success: boolean;
  uuid: string;
  records: {
    _id: string;
    uuidSender: string;
    uuidReceiver: string;
    started: number;
  }[];
}

export function filterFriends(friends: HypixelFriends): string[] {
  if (!friends.records.length) {
    return [];
  }
  const records = friends.records;
  const baseUuid = friends.uuid;
  const tempUuids = records.map((record) => {
    if (record.uuidSender === baseUuid) {
      return record.uuidReceiver;
    } else {
      return record.uuidSender;
    }
  });
  const uuids = removeDuplicates(tempUuids);
  return uuids;
}

export function removeDuplicates(array: string[]) {
  return array.filter((item, index) => {
    return array.indexOf(item) === index && item !== "";
  });
}
