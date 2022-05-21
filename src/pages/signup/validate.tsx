import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import checkKeyValidity from "../../../lib/checkKeyValidity";
import sleep from "../../../lib/sleep";
import FormButton from "../../components/common/FormButton";
import FormInput from "../../components/common/FormInput";
import SignUpForm from "../../components/common/SignUpForm";

export default function Page() {
  const [errorMessage, setErrorMessage] = useState("");
  const [imageTransition, setImageTransition] = useState("full");
  const [apiKey, setApiKey] = useState("");
  const [buttonText, setButtonText] = useState("Validate Key");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [handlingSubmission, setHandlingSubmission] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("temp-password")) {
      router.push("/signup");
      return;
    }
    openPanel();
  }, []);

  async function openPanel() {
    await sleep(200);
    setImageTransition("right");
  }

  useEffect(() => {
    if (handlingSubmission) return;
    setButtonDisabled(true);
    if (
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        apiKey
      )
    )
      setButtonDisabled(false);
  }, [apiKey]);

  const router = useRouter();

  async function handleSubmit() {
    if (buttonDisabled || handlingSubmission) return;
    setButtonDisabled(true);
    setHandlingSubmission(true);
    setButtonText("Verifying Key...");
    const validity = await checkKeyValidity(
      apiKey,
      sessionStorage.getItem("temp-uuid") || ""
    );
    if (validity.code) {
      setErrorMessage(validity.msg);
      setTimeout(() => setErrorMessage(""), 3000);
      setHandlingSubmission(false);
      setButtonDisabled(false);
      setButtonText("Validate Key");
      return;
    }
    sessionStorage.setItem("temp-key", apiKey);
    setImageTransition("fullRight");
    await sleep(200);
    router.push("/signup/import");
  }

  return (
    <SignUpForm
      title="Validate yourself."
      subtitle={"Create an api key on Hypixel with\n/api key, and put it here."}
      formTitle="Validate Identity"
      errorMessage={errorMessage}
      imageBias={imageTransition}
      backPath="/signup"
    >
      <FormInput
        title="Hypixel API Key"
        value={apiKey}
        setValue={setApiKey}
        enterText
        enterKey={handleSubmit}
      />
      <FormButton
        text={buttonText}
        disabled={buttonDisabled}
        handler={handleSubmit}
      />
    </SignUpForm>
  );
}
