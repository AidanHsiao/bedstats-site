import React from "react";
import Background from "../components/login/Background";
import LoginSidebar from "../components/login/LoginSidebar";
import Head from "next/head";

export default function Page() {
  return (
    <React.Fragment>
      <Head>
        <title>Log In to BedStats</title>
        <meta
          name="description"
          content="Sign in to your BedStats account here, and access the BedStats dashboard."
        />
      </Head>
      <main>
        <Background />
        <LoginSidebar />
      </main>
    </React.Fragment>
  );
}
