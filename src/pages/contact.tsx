import React from "react";
import NavBar from "../components/common/NavBar";
import ContactFormWrapper from "../components/contact/ContactForm";
import ContactHeader from "../components/contact/ContactHeader";
import Head from "next/head";

export default function Page() {
  return (
    <React.Fragment>
      <Head>
        <title>Contact us!</title>
        <meta
          name="description"
          content="Fill out the form to contact us; whether it be positive feedback or criticism, we'll try to respond as fast as we can!"
        />
      </Head>
      <NavBar headerVisible={false} />
      <main style={{ marginTop: "90px" }}>
        <ContactHeader />
        <ContactFormWrapper />
      </main>
    </React.Fragment>
  );
}

export function getStaticProps() {
  return { props: {} };
}
