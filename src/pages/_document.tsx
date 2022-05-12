import { Html, Head, Main, NextScript } from "next/document";

import { NextStrictCSP } from "next-strict-csp";

const HeadCSP = process.env.NODE_ENV === "production" ? NextStrictCSP : Head;

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
