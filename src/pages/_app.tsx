import { AppProps } from "next/app";
import { ReactElement } from "react";
import "../common/globals.css";

export default function BedStats({
  Component,
  pageProps,
}: AppProps): ReactElement {
  return <Component {...pageProps} />;
}
