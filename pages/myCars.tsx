import CarList from "../components/CarList";
import { Box, Heading } from "@chakra-ui/react";
import { Auth } from "@supabase/ui";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useEffect } from "react";

const URL = process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL;

const fetcher = (url, token) =>
  fetch(url, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json", token }),
    credentials: "same-origin",
  }).then((res) => res.json());

const MyCars = () => {
  const { user, session } = Auth.useUser();
  const router = useRouter();

  const { data, error } = useSWR(
    session ? ["/api/myCars", session.access_token] : null,
    fetcher
  );

  useEffect(() => {
    !user && router.push(URL);
  }, [user,router]);
  return (
    <Box w="full" p={10}>
      <Heading mb={4}>My cars</Heading>
      {!data?.error && <CarList data={data} />}
    </Box>
  );
};

export default MyCars;
