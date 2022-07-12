import { Text, Input, Button, Box, Alert } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useAuthContext } from "../context/authContext";
import AlertError from "./Alert";

const RecoverPass = () => {
  const [error, setError] = useState();
  const [send, setSend] = useState();
  const { resetPassword, check, checkData } = useAuthContext();
  const inputRef = useRef(null);

  const handleResetPassword = async () => {
    if (inputRef.current.value == "") {
      setError("Enter an email");
    } else {
      try {
        await resetPassword(inputRef.current.value);
        setSend(true);
        setError();
      } catch (error) {
        console.log(error.code);
      }
    }
  };

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Text color={"blue.500"} mb={2} fontWeight={"medium"} fontSize={"2xl"}>
        Recover password
      </Text>
      <Text as={"label"} p={1} pb={2} pt={3} fontWeight={"medium"}>
        email
      </Text>
      <Input
        ref={inputRef}
        type="email"
        name="email"
        placeholder="youremail@company.ltd"
        p={5}
        onChange={(e)=>{checkData(e, 1)}}
      ></Input>
      {error && <AlertError error={error} />}
      {send && (
        <Alert
          status="error"
          borderRadius={"md"}
          color={"green.500"}
          bgColor={"green.100"}
          fontWeight={"medium"}
          mt={3}
          mb={3}
        >
          Correo enviado
        </Alert>
      )}
      <Button
        color={"white"}
        bgColor={"blue.500"}
        height={"12"}
        mt={6}
        p={5}
        _hover={{
          bgColor: "blue.800"
        }}
        _active={{
          bgColor: "blue.800"
        }}
        onClick={handleResetPassword}
        disabled = {check.email ? false : true}
      >
        Send
      </Button>
    </Box>
  );
};

export default RecoverPass;
