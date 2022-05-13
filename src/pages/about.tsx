import React from "react";
import Header from "../components/about/Header";
import NavBar from "../components/common/NavBar";

export default function Page() {
  return (
    <React.Fragment>
      <NavBar headerVisible={false} />
      <main style={{ marginTop: "90px" }}>
        <Header />
      </main>
    </React.Fragment>
  );
}
