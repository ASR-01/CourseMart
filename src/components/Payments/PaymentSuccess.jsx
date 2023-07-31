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

const PaymentSuccess = () => {
  return (
    <>
      <Container h={"90vh"} p={"16"}>
        <Heading textAlign={"center"}>You Have Pro Pack</Heading>
        <VStack
          boxShadow={"dark-lg"}
          pb={"16"}
          alignItems={"center"}
          borderRadius={"lg"}
        >
          <Box w={"full"} bg={"red.400"} p={"4"}>
            <Text color={"black"} children={"Payment Success"} />
          </Box>

          <Box p={"4"}>
            <VStack textAlign={"center"} px={"8"} mt={"4"} spacing={"8"}>
              <Text>
                Congratulation You are a pro member You have access to premium
                Courses
              </Text>
              <Heading size={"4xl"}>
                <RiCheckboxCircleFill />
              </Heading>
            </VStack>
          </Box>
          <Link to={"/profile"}>
            <Button variant={"ghost"} colorScheme="red">
              Go to Profile
            </Button>
          </Link>
          <Heading size={"xs"} children="Reference : Aditya Rawat" />
        </VStack>
      </Container>
    </>
  );
};

export default PaymentSuccess;
