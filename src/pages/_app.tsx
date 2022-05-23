import { AppProps } from "next/app";
import React, { ReactElement } from "react";
import "../common/globals.scss";
import { withSecureHeaders } from "next-secure-headers";
import Head from "next/head";

function BedStats({ Component, pageProps }: AppProps): ReactElement {
  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default withSecureHeaders()(BedStats);
