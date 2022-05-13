import React, { ReactElement, useState } from "react";
import Header from "../components/index/Header";
import Cards from "../components/index/Cards";
import FeatureSection from "../components/index/FeatureSection";
import ElectronLogo from "../../public/index/electronlogo.png";
import Head from "next/head";
import NavBar from "../components/common/NavBar";

export default function Page(): ReactElement {
  const [headerVisible, setHeaderVisible] = useState(true);

  return (
    <React.Fragment>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <NavBar headerVisible={headerVisible} />
        <Header setHeaderVisible={setHeaderVisible} />
        <Cards />
        <FeatureSection
          title="Built with Electron."
          subtitle="Electron.js has made BedStats intuitive, feature-rich, and safe. If you can navigate a website, you can navigate BedStats."
          src={ElectronLogo}
          fixedBackground={false}
        />
        <FeatureSection
          title="Setup isn't a hassle."
          subtitle="Simply click on the download link, then run the setup executable. You can now search for BedStats in your OS's inner search engine, and run the application."
          white={true}
        />
      </main>
    </React.Fragment>
  );
}
