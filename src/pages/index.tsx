import classes from "../common/globalclasses.module.css";
import React, { ReactElement } from "react";
import Header from "../components/index/Header";
import Cards from "../components/index/Cards";
import Footer from "../components/index/Footer";
import BackgroundImage from "../components/index/BackgroundImage";

export default function Page(): ReactElement {
  return (
    <div className={classes.screenContent}>
      <BackgroundImage />
      <Header />
      <Cards />
      <Footer />
    </div>
  );
}
