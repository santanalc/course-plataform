import React from "react";
import Head from "next/head";

interface SeoHead {
  pageName: string;
  pageDescription?: string;
}

export default function SeoHead({ pageName, pageDescription }: SeoHead) {
  return (
    <Head>
      <title>Learnistic - {pageName}</title>
      <meta property="og:title" content={`Learnistic - ${pageName}`} />
      <meta
        name="description"
        content={
          pageDescription
            ? pageDescription
            : "Run your entire business from the palm of your hot little hand."
        }
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
  );
}
