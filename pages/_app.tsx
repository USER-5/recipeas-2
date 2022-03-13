import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useColorScheme, useMediaQuery } from "@mantine/hooks";
import Layout from "components/layout";
import { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";
import "styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  // Big hack to make it work for now
  let [dark, setDark] = useState(false);
  const preferredColorScheme = useMediaQuery("(prefers-color-scheme: dark)");
  useEffect(() => {
    setDark(preferredColorScheme);
  }, [preferredColorScheme]);
  // Causes FART, but better than nothing :/
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, maximum-scale=1"
        />
        <title>Grow and Share Recipes // Recipeas</title>
      </Head>
      <MantineProvider
        theme={{
          colorScheme: dark ? "dark" : "light",
          colors: {
            dark: [
              "#CACBCF",
              "#A6A7AB",
              "#909296",
              "#5c5f66",
              "#373A40",
              "#2C2E33",
              "#25262b",
              "#1A1B1E",
              "#141517",
              "#101113",
            ],
          },
        }}
      >
        <NotificationsProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}
