import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const Subscribe = () => {
  return (
    <Container h={"90vh"} p={"16"}>
      <Heading children="Welcome" my={"8"} textAlign={"center"} />
      <VStack boxShadow={"dark-lg"} alignItems={"stretch"} spacing={"0"}>
        <Box bg={"red.500"} p={"4"}>
          <Text children={`Pro Pack - ₹444`} color={"black"} />
        </Box>

        <Box p={"4"}>
          <VStack textAlign={"center"} px={"8"} mt={"8"}>
            <Text
              children={`Join Pro Pack and get access to all Courses.`}
              colorScheme={"black"}
            />
            <Heading size={"md"} children={`₹444 only`} />
          </VStack>

          <Button my={"8"} w={"full"} bg="red.500">
            Buy Now
          </Button>
        </Box>

        <Box bg={"blackAlpha.800"} p={"4"}>
          <Heading
          color={'white'}
            size={"sm"}
            children={`100% Refund at Cancellation`}
            textTransform={"uppercase"}
          />
          <Text fontSize={'xs'} color={'white'}>*Terms And Condition Apply</Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default Subscribe;
