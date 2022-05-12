import { Html, Head, Main, NextScript } from "next/document";

import crypto from "crypto";
import { v4 } from "uuid";

function generateCSP() {
  const production = process.env.NODE_ENV === "production";

  const nonce = crypto.createHash("sha256").update(v4()).digest("base64");

  let csp = `default-src 'self'; style-src 'unsafe-inline';`;
  csp += `script-src 'nonce-${nonce}' 'self' ${
    production ? "" : "'unsafe-eval'"
  };`;
  if (!production) csp += `connect-src 'self';`;

  return [csp, nonce];
}

export default function Document() {
  const [csp, nonce] = generateCSP();

  return (
    <Html lang="en">
      <Head nonce={nonce}>
        <meta property="csp-nonce" content={nonce} />
        <meta httpEquiv="Content-Security-Policy" content={csp} />
      </Head>
      <body>
        <Main />
        <NextScript nonce={nonce} />
      </body>
    </Html>
  );
}
