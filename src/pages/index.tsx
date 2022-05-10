import classes from "../common/globalclasses.module.css";
import React, { ReactElement } from "react";
import Header from "../components/index/Header";
import Cards from "../components/index/Cards";
import FeatureSection from "../components/index/FeatureSection";
import ElectronLogo from "../../public/index/electronlogo.png";

export default function Page(): ReactElement {
  return (
    <div className={classes.screenContent}>
      <Header />
      <Cards />
      <FeatureSection
        src={ElectronLogo}
        title={"Built with Electron."}
        subtitle={
          "Electron.js has made BedStats intuitive, feature-rich, and safe. If you can navigate a website, you can navigate BedStats."
        }
      />
    </div>
  );
}
