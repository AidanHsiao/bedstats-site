import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import sleep from "../../../lib/sleep";
import FormButton from "../../components/common/FormButton";
import FormInput from "../../components/common/FormInput";
import SignUpForm from "../../components/common/SignUpForm";

export default function Page() {
  const [imageTransition, setImageTransition] = useState("full");

  useEffect(() => {
    if (!sessionStorage.getItem("temp-key")) {
      router.push("/signup");
      return;
    }
    const username = sessionStorage.getItem("temp-username") || "";
    const password = sessionStorage.getItem("temp-password") || "";
    sessionStorage.clear();
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("pass", password);
    openPanel();
  }, []);

  async function openPanel() {
    await sleep(200);
    setImageTransition("right");
  }

  const router = useRouter();

  function handleSubmit() {
    router.push("/dashboard");
  }

  return (
    <SignUpForm
      title="You're finished!"
      subtitle="You've signed up with BedStats."
      formTitle="Congrats! You're done."
      errorMessage=""
      imageBias={imageTransition}
      backPath="/"
    >
      <FormButton
        text="Go to Dashboard"
        disabled={false}
        handler={handleSubmit}
      />
    </SignUpForm>
  );
}
