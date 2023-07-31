import { Container, Heading, VStack, Input, Button } from "@chakra-ui/react";
import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  return (
    <>
      <Container minH={"95vh"} py={"16"}>
        <form>
          <Heading
            children="Forgot Password"
            my={"16"}
            textTransform={"uppercase"}
            textAlign={["center", "left"]}
          />
          <VStack spacing={"8"}>
            <Input
              required
              type="email"
              placeholder="abc@gmail.com"
              value={email}
              name="email"
              id="email"
              focusBorderColor="red.200"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button type="submit" colorScheme="red" w={"full"}>
              Send Reset Link
            </Button>
          </VStack>
        </form>
      </Container>
    </>
  );
};

export default ForgotPassword;
