import { AppProps } from "next/app";
import { ReactElement } from "react";
import "../common/globals.css";
import Head from "next/head";

export default function BedStats({
  Component,
  pageProps,
}: AppProps): ReactElement {
  <Head>
    <link rel="shortcut icon" href="images/favicon.ico" />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="images/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="images/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="images/favicon-16x16.png"
    />
  </Head>;
  return <Component {...pageProps} />;
}
