import { AppProps } from "next/app";
import { ReactElement } from "react";
import "../common/globals.css";
import Head from "next/head";

export default function BedStats({
  Component,
  pageProps,
}: AppProps): ReactElement {
  <Head>
    <meta charSet="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
