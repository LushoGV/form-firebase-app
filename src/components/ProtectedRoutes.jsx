import { useAuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";
import { Spinner, Box } from "@chakra-ui/react";

const ProtectedRoutes = ({ children }) => {
  const { user, loading } = useAuthContext();
  if (loading)
    return (
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Spinner color="blue.500" />
      </Box>
    );

  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
};

export default ProtectedRoutes;
