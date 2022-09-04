import { Auth } from "@supabase/ui";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import CreateCarForm from "../components/CreateSaleForm";
import React from "react";

const URL = process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL;

export default function Profile() {
  const router = useRouter();
  const { user, session } = Auth.useUser();

  useEffect(() => {
    !user && router.push(URL);
  }, [user,router]);

  return (
    user && (
      <Box maxWidth="100%" m="0 auto" p={4}>
        <Heading>Hola {user?.identities[0]?.identity_data?.user_name}</Heading>
        <CreateCarForm />
      </Box>
    )
  );
}
