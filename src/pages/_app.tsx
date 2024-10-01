import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import { Navbar } from "~/components/navbar";
import { ReactQueryProvider } from "~/components/providers/react-query-provider";
import { Toaster } from "~/components/ui/toaster";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Pokedex - Bolt Group</title>
        <meta name="description" content="Bolt Group technical test" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <ReactQueryProvider>
        <Navbar />
        <Component {...pageProps} />
        <Toaster />
      </ReactQueryProvider>
    </>
  
)
};

export default MyApp;
