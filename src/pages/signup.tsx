import styles from "../components/signup/FriendsData/main.module.scss";
import React, { useState, ReactElement, useEffect } from "react";
import { createHash } from "crypto";
import { useRouter } from "next/router";

import getUser from "../../lib/db/getUser";
import setUser from "../../lib/db/setUser";
import getFriends from "../../lib/getFriends";
import checkKeyValidity from "../../lib/checkKeyValidity";
import SignUp from "../components/signup/SignUp";
import ProgressBar from "../components/signup/ProgressBar";
import APIKey from "../components/signup/APIKey";
import FriendsData from "../components/signup/FriendsData";
import Finished from "../components/signup/Finished";
import Utility from "../components/signup/Utility";
import getPass from "../../lib/getPass";

const scale = 1;

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const progress1 = 9;
const progress2 = 36;
const progress3 = 65;
const progress4 = 92;

interface friendsItem {
  username: string;
  uuid: string;
}

export default function Page(): ReactElement {
  const router = useRouter();

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
  let [errorVisible, setErrorVisibility] = useState(false);
  let [friendsArr, setFriendsArr] = useState([""]);
  let [importButton, setImportButton] = useState(styles.friendsImport);

  let friendsList: friendsItem[] = [];

  async function checkSignUpValidity(): Promise<void> {
    setMessage("Verifying Username...");
    setCoverIndex(2);
    const resp = await getUser(username);
    setCoverIndex(-1);
    console.log(resp);
    if (resp.code !== 1) {
      setErrorMessage(resp.msg);
      setErrorVisibility(true);
      setTimeout(() => setErrorVisibility(false), 5000);
      return;
    }
    setUuid(resp.uuid);
    setOpacity1(0);
    setProgress(progress2);
    await sleep(200);
    setUsername(resp.username);
    setOpacity2(1);
  }

  async function notName(): Promise<void> {
    setOpacity2(0);
    setProgress(progress1);
    await sleep(200);
    setOpacity1(1);
  }

  async function checkAPIKeyValidity(): Promise<void> {
    setMessage("Validating API Key...");
    setCoverIndex(2);
    const keyValidity = await checkKeyValidity(apiKey, uuid);
    setCoverIndex(-1);
    if (keyValidity.code) {
      setErrorMessage(keyValidity.msg);
      setErrorVisibility(true);
      setTimeout(() => setErrorVisibility(false), 5000);
      return;
    }
    setOpacity2(0);
    setProgress(progress3);
    setMessage("Downloading Friends Data...");
    const friendsData = await getFriends(apiKey, uuid);
    setFriendsArr(friendsData);
    if (!friendsData.length) {
      setImportButton(`${styles.friendsImport} ${styles.friendsImportOff}`);
    } else {
      setImportButton(styles.friendsImport);
    }
    setCoverIndex(-1);
    setOpacity3(1);
  }

  async function importFriends(): Promise<void> {
    let searched = 0;
    setMessage(`Importing Friends (${searched}/${friendsArr.length})`);
    setCoverIndex(2);
    friendsArr.forEach(async (uuid) => {
      const user = await fetch(
        `https://api.ashcon.app/mojang/v2/user/${uuid}`
      ).then((res) => res.json());
      friendsList.push({ username: user.username, uuid: uuid });
      searched++;
      setMessage(`Importing Friends (${searched}/${friendsArr.length})`);
      if (searched === friendsArr.length) {
        finished();
      }
    });
  }

  async function finished(): Promise<void> {
    setOpacity3(0);
    setProgress(progress4);
    setMessage(`Uploading To Database...`);
    const hash = createHash("sha256")
      .update(`${username.toLowerCase()}${password}`)
      .digest("hex");
    await setUser({
      username: username,
      uuid: uuid,
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

  async function goToDash(): Promise<void> {
    if (opacity4 === 0) return;
    setOpacity4(0);
    setProgress(100);
    setMessage("");
    await sleep(200);
    router.push("/dashboard");
  }

  useEffect(() => {
    const pass = getPass();
    if (pass) {
      router.push("/login");
      return;
    }
  }, []);

  return (
    <main
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Utility
        coverIndex={coverIndex}
        message={message}
        errorVisible={errorVisible}
        errorMessage={errorMessage}
      />
      <div className="signUpWrapper" style={{ transform: `scale(${scale})` }}>
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
      <style jsx global>{`
        .screenContent {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }

        .form {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 0.5vw;
        }

        .form input {
          width: 70%;
          height: 4vw;
          margin-top: 1vw;
          border: none;
          border-bottom: 0.2vw solid rgb(186, 107, 178);
          border-radius: 1vw;
          font-size: 2vw;
          padding-left: 1vw;
        }

        .form button {
          width: 70%;
          height: 4vw;
          margin-top: 3vw;
          border: none;
          border-radius: 1vw;
          font-size: 2vw;
          cursor: not-allowed;
          color: rgb(255, 197, 252);
          background-color: rgba(186, 107, 178, 0.4);
          transition: color 0.2s, background-color 0.2s;
        }

        .form button:not(.signUpNotReady) {
          color: white;
          background-color: rgb(186, 107, 178);
          cursor: pointer;
        }

        .form button:not(.signUpNotReady):active {
          background-color: rgb(147, 59, 139);
        }

        .formWrapper {
          transition: opacity 0.2s;
          position: absolute;
          width: 70vw;
        }

        .centralTitle {
          font-size: 4vw;
          text-align: center;
          margin-top: 2vw;
        }

        .signUpWrapper {
          width: 70%;
          height: 39.375vw;
          margin: auto;
          border: 0.2vw solid rgb(186, 107, 178);
          background-color: rgba(188, 153, 184, 0.5);
          border-radius: 5vw;
        }
      `}</style>
    </main>
  );
}
