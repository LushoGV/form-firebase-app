import { useState } from "react";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Button, Input, Text, Box } from "@chakra-ui/react";
import AlertError from "./Alert";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  const { login, loginWithGoogle } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError();
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("Invalid email");
      } else if (error.code === "auth/internal-error") {
        setError("Incorrect password");
      } else if (error.code === "auth/user-not-found") {
        setError("User not found");
      } else {
        setError("Incorrect password");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      console.log(error.message);
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
            mb={1}
            fontWeight={"medium"}
            fontSize={"2xl"}
          >
            Welcome!
          </Text>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            m={2}
            p={2}
          >
            <Text as={"label"} pb={2} fontWeight={"medium"} htmlFor="email">
              email
            </Text>
            <Input
              p={5}
              type="text"
              name="email"
              placeholder="youremail@company.ltd"
              onChange={handleChange}
            />
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            m={2}
            mt={0}
            mb={4}
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
              onChange={handleChange}
            />
            <Text
              as={"a"}
              cursor={"pointer"}
              bgColor={"white"}
              color={"blue.500"}
              ml={1}
              mt={1}
              fontWeight={"medium"}
              fontSize={"1xl"}
              onClick={() => navigate("/recover_password")}
            >
              Forgot password?
            </Text>
          </Box>
          <Button
            bgColor={"blue.500"}
            color={"white"}
            height={"12"}
            m={3}
            mb={0}
            p={5}
            onClick={(e) => handleSubmit(e)}
          >
            Login
          </Button>
        </Box>
      </form>
      <Button onClick={handleGoogleSignIn} m={3} mb={0}>
        Login with Google
      </Button>
      <Box mt={3} pb={1} display={"flex"} justifyContent={"center"}>
        <Text
          as={"span"}
          bgColor={"white"}
          color={"gray.500"}
          ml={1}
          fontWeight={"medium"}
          fontSize={"sm"}
        >
          Don´t have an account?
        </Text>
        <Text
          as={"span"}
          cursor={"pointer"}
          bgColor={"white"}
          color={"blue.500"}
          ml={1}
          fontWeight={"medium"}
          fontSize={"sm"}
          onClick={(e) => navigate("/register")}
        >
          Sign up
        </Text>
      </Box>
    </>
  );
};

export default Login;
