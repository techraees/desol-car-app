import { Text } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return <></>; // Return empty JSX element
  return (
    <Text color="red" as="p" className="text-[10px]">
      {children}
    </Text>
  );
};

export default ErrorMessage;
