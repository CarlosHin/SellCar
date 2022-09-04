import React from "react";
import { Auth } from "@supabase/ui";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "../components/Header";
import { supabase } from "../lib/initSupabase";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={"dark"}>
      <ChakraProvider>
        <Auth.UserContextProvider supabaseClient={supabase}>
          <Header />
          <Component {...pageProps} />
        </Auth.UserContextProvider>
      </ChakraProvider>
    </main>
  );
}
