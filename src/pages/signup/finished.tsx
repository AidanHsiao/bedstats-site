import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import sleep from "../../../lib/sleep";
import FormButton from "../../components/signup/FormButton";
import SignUpForm from "../../components/signup/SignUpForm";
import Head from "next/head";

export default function Page() {
  const [imageTransition, setImageTransition] = useState("full");

  useEffect(() => {
    if (!sessionStorage.getItem("temp-key")) {
      router.push("/signup");
      return;
    }
    const username = sessionStorage.getItem("temp-username") || "";
    const password = sessionStorage.getItem("temp-password") || "";
    const uuid = sessionStorage.getItem("temp-uuid") || "";
    sessionStorage.clear();
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("pass", password);
    sessionStorage.setItem("uuid", uuid);
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
    <React.Fragment>
      <Head>
        <meta name="robots" content="noindex nofollow" />
      </Head>
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
    </React.Fragment>
  );
}
