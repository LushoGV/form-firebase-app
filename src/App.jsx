import { Container } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import Login from "./components/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import RecoverPass from "./components/RecoverPass";
import Register from "./components/Register";
import { AuthProvider } from "./context/authContext";

const App = () => {
  return (
    <Container
      maxW="md"
      border={"1px"}
      borderColor={"gray.300"}
      borderRadius={"md"}
      p={5}
      mt={5}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
    >
      <AuthProvider>
        <Routes>
          <Route path="/" element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recover_password" element={<RecoverPass />} />
        </Routes>
      </AuthProvider>
    </Container>
  );
};

export default App;
