import { AppProps } from "next/app";
import React, { ReactElement } from "react";
import "../common/globals.css";
import Head from "next/head";

export default function BedStats({
  Component,
  pageProps,
}: AppProps): ReactElement {
  return <Component {...pageProps} />;
}
