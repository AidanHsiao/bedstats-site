import { createHash } from "crypto";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import getUser from "../../../lib/db/getUser";
import sleep from "../../../lib/sleep";
import FormButton from "../../components/common/FormButton";
import FormInput from "../../components/common/FormInput";
import SignUpForm from "../../components/common/SignUpForm";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [buttonText, setButtonText] = useState("Create Account");
  const [handlingSubmission, setHandlingSubmission] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [imageTransition, setImageTransition] = useState("full");

  function handleUsernameChange(value: string) {
    if (username.length === 16 && value.length > 16) return;
    const lastChar = value[value.length - 1];
    if (!/\w/.test(lastChar)) return;
    setUsername(value);
  }

  useEffect(() => {
    if (handlingSubmission) return;
    setButtonDisabled(false);
    if (!/^\w{2,16}$/.test(username)) setButtonDisabled(true);
    if (!password || confirmPass !== password) setButtonDisabled(true);
  }, [username, password, confirmPass]);

  const router = useRouter();

  async function handleSubmit() {
    if (buttonDisabled || handlingSubmission) return;
    setButtonDisabled(true);
    setHandlingSubmission(true);
    setButtonText("Verifying Username...");
    const resp = await getUser(username);
    if (resp.code !== 1) {
      setErrorMessage(resp.msg);
      setTimeout(() => setErrorMessage(""), 3000);
      setButtonText("Create Account");
      setHandlingSubmission(false);
      setButtonDisabled(false);
      return;
    }
    sessionStorage.setItem("temp-username", resp.username);
    sessionStorage.setItem("temp-uuid", resp.uuid);
    sessionStorage.setItem(
      "temp-password",
      createHash("sha256")
        .update(`${username.toLowerCase()}${password}`)
        .digest("hex")
    );
    setImageTransition("full");
    await sleep(200);
    router.push("/signup/validate");
  }

  useEffect(() => {
    openPanel();
  }, []);

  async function openPanel() {
    await sleep(200);
    setImageTransition("left");
  }

  return (
    <SignUpForm
      title="Welcome to BedStats!"
      subtitle="Create an account at the right."
      formTitle="Create Account"
      errorMessage={errorMessage}
      imageBias={imageTransition}
      backPath="/"
    >
      <FormInput
        title="Minecraft Username"
        value={username}
        setValue={handleUsernameChange}
        enterText
      />
      <FormInput
        title="Password"
        value={password}
        setValue={setPassword}
        enterText
        password
      />
      <FormInput
        title="Confirm Password"
        value={confirmPass}
        setValue={setConfirmPass}
        enterKey={handleSubmit}
        password
      />
      <FormButton
        text={buttonText}
        disabled={buttonDisabled}
        handler={handleSubmit}
      />
    </SignUpForm>
  );
}
