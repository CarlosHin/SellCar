import { useEffect, useState } from "react";
import { supabase } from "../lib/initSupabase";
import { Auth } from "@supabase/ui";
import { useRouter } from "next/router";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";
const URL = process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL;

const Index = () => {
  const { user, session } = Auth.useUser();
  const [authView, setAuthView] = useState("sign_in");
  const router = useRouter();
  user && router.push(`${URL}/cars`);

  console.log("user", user);
  useEffect(() => {
    // @ts-ignore
    user && router.push(`${URL}/profile`);
  }, [user]);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "PASSWORD_RECOVERY") setAuthView("update_password");
        if (event === "USER_UPDATED")
          setTimeout(() => setAuthView("sign_in"), 1000);
        // Send session to /api/auth route to set the auth cookie.
        // NOTE: this is only needed if you're doing SSR (getServerSideProps)!
        fetch("/api/auth", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ event, session }),
        }).then((res) => res.json());
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const View = () => {
    return (
      <Box>
        <Auth
          supabaseClient={supabase}
          providers={["github", "google"]}
          // @ts-ignore
          view={authView}
          socialLayout="horizontal"
          socialButtonSize="xlarge"
          redirectTo={URL}
        />
      </Box>
    );
  };

  return (
    <Flex w="full" p={{ base: 4, md: 10 }} m={0} justify="center">
      <View />
    </Flex>
  );
};

export default Index;
