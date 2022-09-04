import React, { useState, useEffect } from "react";
import { Auth, Icon } from "@supabase/ui";
import { supabase } from "../lib/initSupabase";
import { useRouter } from "next/router";
import {
  Button,
  Img,
  Flex,
  Stack,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  useBreakpointValue,
} from "@chakra-ui/react";

const URL = process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL;

export default function Header() {
  const router = useRouter();
  const authResponse = Auth.useUser();

  const [user, setUser] = useState(null);
  const logOut = () => {
    supabase.auth.signOut();
    router.push(URL)
  };

  useEffect(() => {
    setUser(authResponse?.user);
  }, [authResponse]);

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      h={{ base: "60px", md: "80px" }}
      borderBottom="0.5px solid gray"
      borderRadius={2}
      w="100%"
      pr={4}
      alignItems={{ base: "center", md: "end" }}
      justifyContent="space-between"
    >
      <Img
        src="/assets/images/logo.jpeg"
        h="100%"
        onClick={() => router.push(`${URL}`)}
        cursor="pointer"
      />
      {!isMobile && (
        <>
          <Stack direction="row" spacing={2}>
            {user && (
              <Button onClick={() => router.push(`${URL}/profile`)} mb={4}>
                Profile
              </Button>
            )}
            {user && (
              <Button onClick={() => router.push(`${URL}/myCars`)} mb={4}>
                My cars
              </Button>
            )}
            <Button onClick={() => router.push(`${URL}/cars`)} mb={4}>
              Cars
            </Button>
          </Stack>
          <Stack>
            {!user && (
              <Button onClick={() => router.push(`${URL}/`)} mb={4}>
                Iniciar sesión
              </Button>
            )}
            {user && (
              <Button onClick={() => logOut()} mb={4}>
                Log out
              </Button>
            )}
          </Stack>
        </>
      )}
      {isMobile && (
        <>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton isActive={isOpen} as={Button}>
                  Menu
                </MenuButton>
                <MenuList>
                  {!user && (
                    <MenuItem onClick={() => router.push(`${URL}`)}>
                      Inicio
                    </MenuItem>
                  )}
                  {user && (
                    <MenuItem onClick={() => router.push(`${URL}/profile`)}>
                      Perfil
                    </MenuItem>
                  )}
                  <MenuItem onClick={() => router.push(`${URL}/cars`)}>
                    Coches
                  </MenuItem>
                  {user && (
                    <MenuItem onClick={() => router.push(`${URL}/myCars`)}>
                      Mis Coches
                    </MenuItem>
                  )}
                  {user && (
                    <MenuItem onClick={() => logOut()}>Cerrar sesión</MenuItem>
                  )}
                </MenuList>
              </>
            )}
          </Menu>
        </>
      )}
    </Flex>
  );
}
