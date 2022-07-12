import { useState } from "react";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import AlertError from "./Alert";

const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  const { signUp, check, checkData } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError();
    try {
      await signUp(user.email, user.password);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("Invalid email");
      } else if (error.code === "auth/internal-error") {
        setError("Incorrect password");
      } else if (error.code === "auth/weak-password") {
        setError("Password must be at least 6 characters long");
      } else if (error.code === "auth/user-not-found") {
        setError("User not found");
      } else if (error.code === "auth/email-already-in-use") {
        setError("Email already in use");
      }
    }
  };


  return (
    <>
      {error && <AlertError error={error} />}

      <form onSubmit={(e) => handleSubmit(e)}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <Text
            color={"blue.500"}
            ml={3}
            mb={2}
            fontWeight={"medium"}
            fontSize={"2xl"}
          >
            Sign up
          </Text>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            m={2}
            mt={0}
            p={2}
          >
            <Text as={"label"} pb={2} fontWeight={"medium"} htmlFor="email">
              email
            </Text>
            <Input
              p={5}
              type="email"
              name="email"
              placeholder="youremail@company.ltd"
              onChange={(e)=> {handleChange(e), checkData(e, 1)}}
              onBlur={(e)=> checkData(e, 1)}
            />
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            m={2}
            mt={0}
            p={2}
          >
            <Text as={"label"} pb={2} fontWeight={"medium"} htmlFor="password">
              password
            </Text>
            <Input
              p={5}
              type="password"
              name="password"
              id="password"
              placeholder="******"
              onChange={(e)=> {handleChange(e), checkData(e, 2)}}
              onBlur={(e)=> checkData(e, 2)}
            />
          </Box>
          <Button
            bgColor={"blue.500"}
            color={"white"}
            m={4}
            mt={3}
            p={6}
            mb={0}
            _hover={{
              bgColor: "blue.800"
            }}
            _active={{
              bgColor: "blue.800"
            }}
            onClick={(e) => handleSubmit(e)}
            disabled = {check.email && check.pass ? false : true}
          >
            Sign up
          </Button>
          <Box pt={2} display={"flex"} justifyContent={"center"}>
            <Text
              as={"span"}
              bgColor={"white"}
              color={"gray.500"}
              ml={1}
              fontWeight={"medium"}
              fontSize={"sm"}
            >
              Already have an account?
            </Text>
            <Text
              as={"span"}
              cursor={"pointer"}
              bgColor={"white"}
              color={"blue.500"}
              ml={1}
              fontWeight={"medium"}
              fontSize={"sm"}
              _hover={{
                color: "blue.600",
                textDecoration: "underline"
              }}
              _active={{
                color: "blue.800"
              }}
              onClick={() => navigate("/login")}
            >
              Log in
            </Text>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default Register;
