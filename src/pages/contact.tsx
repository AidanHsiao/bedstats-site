import React from "react";
import NavBar from "../components/common/NavBar";
import ContactForm from "../components/contact/ContactForm";
import ContactHeader from "../components/contact/ContactHeader";

export default function Page() {
  return (
    <React.Fragment>
      <NavBar headerVisible={false} />
      <main style={{ marginTop: "90px" }}>
        <ContactHeader />
        <ContactForm />
      </main>
    </React.Fragment>
  );
}
