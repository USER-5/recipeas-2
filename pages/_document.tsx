import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";

const getInitialProps = createGetInitialProps();

export default class MyDocument extends Document {
  static getInitialProps = getInitialProps;
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap"
          />
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <body className="dark:bg-mt-dark-7 dark:text-mt-dark-0">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
