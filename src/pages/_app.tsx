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
    <link rel="shortcut icon" href="/favicon.ico" />
  </Head>;
  return <Component {...pageProps} />;
}
