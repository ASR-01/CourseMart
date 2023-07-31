import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
const PaymentFail = () => {
  return (
    <Container h={"90vh"} p={"16"}>
      <VStack
        boxShadow={"dark-lg"}
        pb={"16"}
        alignItems={"center"}
        borderRadius={"lg"}
      >
        <Heading children={"Payment Fail"} p={"10"} />

        <Link to={"/subscribe"}>
          <Button variant={"ghost"} colorScheme="red">
            Try Again{" "}
          </Button>
        </Link>
        <Heading size={"xs"} children="Reference : Aditya Rawat" />
      </VStack>
    </Container>
  );
};

export default PaymentFail;
