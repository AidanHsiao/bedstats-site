import React from "react";
import NavBar from "../components/common/NavBar";
import ContactFormWrapper from "../components/contact/ContactForm";
import ContactHeader from "../components/contact/ContactHeader";

export default function Page() {
  return (
    <React.Fragment>
      <NavBar headerVisible={false} />
      <main style={{ marginTop: "90px" }}>
        <ContactHeader />
        <ContactFormWrapper />
      </main>
    </React.Fragment>
  );
}
