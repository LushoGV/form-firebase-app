import { Alert } from "@chakra-ui/react";

const AlertError = ({ error }) => {
  return (
    <Alert
      status="error"
      borderRadius={"md"}
      color={"red.400"}
      fontWeight={"medium"}
      mt={3}
      mb={3}
    >
      {error}
    </Alert>
  );
};

export default AlertError;
