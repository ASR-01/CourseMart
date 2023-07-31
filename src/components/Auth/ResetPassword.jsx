import { Container, Heading, VStack, Input, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import {useParams} from 'react-router-dom'

const ResetPassword = () => {
  const [password, setPassword] = useState("");

  const params = useParams()
  console.log(params.token);

  return (
    <Container minH={"95vh"} py={"16"}>
    <form>
      <Heading
        children="Reset Password"
        my={"16"}
        textTransform={"uppercase"}
        textAlign={["center", "left"]}
      />
      <VStack spacing={"8"}>
        <Input
          required
          type="password"
          placeholder="password...."
          value={password}
          name="password"
          focusBorderColor="red.200"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" colorScheme="red" w={"full"}>
          Reset password
        </Button>
      </VStack>
    </form>
  </Container>  )
}

export default ResetPassword