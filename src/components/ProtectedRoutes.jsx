import { useAuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({children}) => { 
  const { user, loading } = useAuthContext();
  if (loading) return <h1>loading...</h1>;

  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
};

export default ProtectedRoutes;
