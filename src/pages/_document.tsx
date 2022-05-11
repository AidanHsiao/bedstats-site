import { Html, Head, Main, NextScript } from "next/document";

import { NextStrictCSP } from "next-strict-csp";

const HeadCSP = process.env.NODE_ENV === "production" ? NextStrictCSP : Head;

export default function Document() {
  const csp = `default-src: 'self'; script-src: 'self' ; frame-ancestors: 'self' https://bedstats-site.vercel.app`;

  return (
    <Html lang="en">
      <HeadCSP>
        {process.env.NODE_ENV === "production" && (
          <meta httpEquiv="Content-Security-Policy" content={csp} />
        )}
      </HeadCSP>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
