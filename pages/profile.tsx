import { Auth } from "@supabase/ui";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import CreateCarForm from "../components/CreateSaleForm";
import React from "react";

const URL = process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL;

export default function Profile() {
  const router = useRouter();
  const authResponse = Auth.useUser();

  const [user, setUser] = useState(null);
  useEffect(() => {
    if (authResponse) {

      setUser(authResponse?.user);
      !authResponse.user && router.push(URL);
    }

  }, [authResponse, router]);


  return (
    user && (
      <Box maxWidth="100%" m="0 auto" p={4}>
        <Heading mb={4}>Hola {user?.identities[0]?.identity_data?.user_name}</Heading>
        <CreateCarForm />
      </Box>
    )
  );
}
