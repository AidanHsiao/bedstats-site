import { Html, Head, Main, NextScript } from "next/document";

import crypto from "crypto";
import { v4 } from "uuid";

function generateCSP() {
  const production = process.env.NODE_ENV === "production";

  const nonce = crypto.createHash("sha256").update(v4()).digest("base64");

  const whitelistedUrls = ["https://www.gstatic.com"];

  let csp = `default-src 'none'; base-uri 'self'; connect-src 'self' https://api.hypixel.net https://api.ashcon.app ${
    production ? "" : "*.vercel.app"
  }; font-src 'self'; form-action 'self'; prefetch-src 'self'; img-src 'self' data:; style-src 'unsafe-inline' 'self' ${whitelistedUrls.join(
    " "
  )};`;
  csp += ` script-src ${whitelistedUrls.join(" ")} 'nonce-${nonce}' 'self' ${
    production ? "" : "'unsafe-eval'"
  };`;

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
