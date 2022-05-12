import { Html, Head, Main, NextScript } from "next/document";

import { NextStrictCSP } from "next-strict-csp";

const HeadCSP = process.env.NODE_ENV === "production" ? NextStrictCSP : Head;

export default function Document() {
  return (
    <Html lang="en">
      <HeadCSP>
        {process.env.NODE_ENV === "production" && (
          <meta
            httpEquiv="Content-Security-Policy"
            content="script-src 'self'; frame-ancestors 'none'"
          />
        )}
      </HeadCSP>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
