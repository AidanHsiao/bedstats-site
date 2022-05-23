import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Friend } from "../../../lib/interfaces";
import setUser from "../../../lib/db/setUser";
import getFriends from "../../../lib/getFriends";
import sleep from "../../../lib/sleep";
import FormButton from "../../components/common/FormButton";
import SignUpForm from "../../components/common/SignUpForm";
import Head from "next/head";

export default function Page() {
  const [imageTransition, setImageTransition] = useState("fullRight");
  const [importText, setImportText] = useState("");
  const [friendsLength, setFriendsLength] = useState(0);
  const [friendsArr, setFriendsArr] = useState<string[]>([]);

  useEffect(() => {
    if (!sessionStorage.getItem("temp-key")) {
      router.push("/signup");
      return;
    }
    setImportText("Importing Friends Data...");
    openPanel();
  }, []);

  async function openPanel() {
    const friendsData = await getFriends(
      sessionStorage.getItem("temp-key") || "",
      sessionStorage.getItem("temp-uuid") || ""
    );
    setFriendsLength(friendsData.length);
    setImageTransition("left");
    setFriendsArr(friendsData);
    await sleep(200);
    setImportText("");
  }

  const router = useRouter();

  async function handleImport() {
    setImageTransition("full");
    const friendsList: Friend[] = [];
    let searched = 0;
    setImportText(`Importing Friends (0/${friendsArr.length})`);
    friendsArr.forEach(async (uuid) => {
      const user = await fetch(
        `https://api.ashcon.app/mojang/v2/user/${uuid}`
      ).then((res) => res.json());
      friendsList.push({ username: user.username, uuid: uuid });
      searched++;
      setImportText(`Importing Friends (${searched}/${friendsArr.length})`);
      if (searched === friendsArr.length) {
        handleSubmit(friendsList);
      }
    });
  }

  async function handleSubmit(friendsList: Friend[]) {
    setImageTransition("full");
    setImportText(`Uploading to database...`);
    await setUser({
      username: sessionStorage.getItem("temp-username") || "",
      uuid: sessionStorage.getItem("temp-uuid") || "",
      password: sessionStorage.getItem("temp-password") || "",
      hypixelAPIKey: sessionStorage.getItem("temp-key") || "",
      friends: friendsList || [],
      settings: {
        theme: "Midnight",
        animationEnabled: true,
        animationRate: "40 FPS",
        hypixelAPIKey: sessionStorage.getItem("temp-key") || "",
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
    router.push("/signup/finished");
  }

  return (
    <React.Fragment>
      <Head>
        <meta name="robots" content="noindex nofollow" />
      </Head>
      <SignUpForm
        title="You have friends."
        subtitle={"Would you like to import them?"}
        formTitle={`Import ${friendsLength} Friends?`}
        errorMessage=""
        imageBias={imageTransition}
        backPath="/signup/validate"
        wrapperText={importText}
      >
        <FormButton
          text="Yes, import my friends."
          disabled={false}
          handler={handleImport}
        />
        <FormButton
          text="No, I'll add them myself."
          disabled={false}
          handler={() => handleSubmit([])}
          cancel
        />
      </SignUpForm>
    </React.Fragment>
  );
}
