import {
  Container,
  Heading,
  VStack,
  Box,
  Button,
  FormLabel,
  Image,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  return (
    <>
      <Container h={"92vh"} mt={"10"}>
        <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
          <Heading children={"Contact US"} />

          <form style={{ width: "100%" }}>
            <Box>
              <FormLabel htmlFor="name" children={"Name"} />

              <Input
                type="text"
                placeholder="enter name .."
                value={name}
                name="name"
                id="name"
                focusBorderColor="red.200"
                onChange={(e) => setName(e.target.value)}
              />
            </Box>

            <Box my={"4"}>
              <FormLabel htmlFor="email" children={"Email Address"} />
              <Input
                type="email"
                placeholder="abc@gmail.com"
                value={email}
                name="email"
                id="email"
                focusBorderColor="red.200"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>

            <Box>
              <FormLabel htmlFor="message" children={"message"} />

              <Textarea
                required
                placeholder=" Your message"
                value={message}
                id="message"
                focusBorderColor="red.200"
                onChange={(e) => setMessage(e.target.value)}
              />
            </Box>

            <Button my={"4"} colorScheme="red" type="submit">
              Send Mail
            </Button>
            <Box my={"4"}>
              Request for a skill?{" "}
              <Link to={"/request"}>
                <Button colorScheme="red" variant={"link"}>
                  Click here
                </Button>{" "}
                here
              </Link>
            </Box>
          </form>
        </VStack>
        
       
      </Container>
     
    </>
  );
};

export default Contact;
