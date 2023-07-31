import React from "react";
import { Button, Container, Heading, VStack } from "@chakra-ui/react";
import { RiErrorWarningFill } from "react-icons/ri";

import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <>
      <Container h={"90vh"}>
        <VStack
          h={"full"}
          boxShadow={"dark-lg"}
          justifyContent={"center"}
          spacing={"4"}
        >
          <Heading> Not Found</Heading>
          <RiErrorWarningFill size={"5rem"} />
          <Link to={"/"}>
            <Button>Go to Home</Button>
          </Link>
        </VStack>
      </Container>
    </>
  );
};

export default NotFound;
