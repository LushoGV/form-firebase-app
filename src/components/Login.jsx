import { useState } from "react";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Button, Input, Text, Box, Image } from "@chakra-ui/react";
import AlertError from "./Alert";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  const { login, loginWithGoogle, check, checkData, clearAlert } = useAuthContext();
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
              onChange={(e)=> {handleChange(e), clearAlert(e, 1) }}
              onBlur={(e)=> checkData(e, 1)}
            />
            {check.errEmail && <AlertError error={check.errEmail} />}
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
              onChange={(e)=> {handleChange(e), clearAlert(e, 2)}}
              onBlur={(e)=> checkData(e, 2)}
            />
            {check.errPass && <AlertError error={check.errPass} />}
            <Text
              as={"a"}
              cursor={"pointer"}
              bgColor={"white"}
              color={"blue.500"}
              ml={1}
              mt={1}
              fontWeight={"medium"}
              fontSize={"1xl"}
              _hover={{
                color: "blue.600",
                textDecoration: "underline",
              }}
              _active={{
                color: "blue.800",
              }}
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
            _hover={{
              bgColor: "blue.800",
            }}
            _active={{
              bgColor: "blue.800",
            }}
            onClick={(e) => handleSubmit(e)}
            disabled = {check.email && check.pass ? false : true}
          >
            Login
          </Button>
        </Box>
      </form>
      <Button
        onClick={handleGoogleSignIn}
        m={3}
        mb={0}
        p={5}
        bgColor={"white"}
        border={"2px"}
        borderColor={"gray.200"}
        _hover={{
          color: "gray.500"
        }}
        _active={{
          bgColor: "gray.100"
        }}
      >
        <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
          width={5}
          mr={3}
        />
        Continue with Google
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
          _hover={{
            color: "blue.600",
            textDecoration: "underline",
          }}
          _active={{
            color: "blue.800",
          }}
          onClick={(e) => navigate("/register")}
        >
          Sign up
        </Text>
      </Box>
    </>
  );
};

export default Login;
