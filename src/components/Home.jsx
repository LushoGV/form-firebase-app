import { Box, Button, Text, Image } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuthContext } from "../context/authContext";

export const Home = () => {
  const { user, logOut } = useAuthContext();

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        pb={3}
      >
        <Box display={"flex"} flexDirection={"column"}>
          <Text as={"h1"} pb={0} fontSize={"2xl"} fontWeight={"medium"}>
            Welcome
          </Text>
          <Text
            as={"h1"}
            fontSize={"2xl"}
            fontWeight={"medium"}
            color={"blue.500"}
          >
            {user.displayName || user.email}
          </Text>
        </Box>
        {user.photoURL && (
          <Image
            width={"14"}
            height={"14"}
            borderRadius={"full"}
            src={user.photoURL}
          />
        )}
      </Box>
      <Box
        boxSize="sm"
        width={"full"}
        height={"1xl"}
        pt={"2"}
        pb={"4"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Image
          borderRadius={"5"}
          src="https://i.gifer.com/origin/34/34640120f68ea86b3b4c902b51bd453d.gif"
        />
      </Box>
      <Button
        bgColor={"red.500"}
        color={"white"}
        p={6}
        m={4}
        ml={0}
        mr={0}
        onClick={handleLogOut}
      >
        Logout
      </Button>
    </Box>
  );
};
