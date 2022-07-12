import { Container, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./components/Home";
import Login from "./components/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import RecoverPass from "./components/RecoverPass";
import Register from "./components/Register";
import { AuthProvider } from "./context/authContext";

const App = () => {
  
  return (
    <Container as={"main"}
      maxW="md" 
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
          <Route path="*" element={<Navigate to="/login" />}/>
        </Routes>
      </AuthProvider>
    </Container>
  );
};

export default App;
