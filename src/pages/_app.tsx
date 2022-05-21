import { AppProps } from "next/app";
import React, { ReactElement } from "react";
import "../common/globals.scss";
import { withSecureHeaders } from "next-secure-headers";

function BedStats({ Component, pageProps }: AppProps): ReactElement {
  return <Component {...pageProps} />;
}

export default withSecureHeaders()(BedStats);
