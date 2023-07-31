import { Container, Heading, VStack, Input, Button } from "@chakra-ui/react";
import React, { useState } from "react";


const UpdateProfile = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const updateProfileSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <Container py={"16"} minH={"92vh"} >
        <form onSubmit={updateProfileSubmitHandler}>
          <Heading
      
            children={"Update Profile"}
            my={"16"}
            textAlign={["center", "left"]}
            textTransform={"uppercase"}
          />
          <VStack spacing={"8"} boxShadow={'dark-lg'}>
            <Input
              type="text"
              placeholder="Enter Name"
              value={name}
              name="name"
              focusBorderColor="red.200"
              onChange={(e) => setName(e.target.value)}
            />
             <Input
              type="email"
              placeholder="Enter Email"
              value={email}
              name="email"
              focusBorderColor="red.200"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button colorScheme="red" type="submit" w={"full"}>
              Update
            </Button>
          </VStack>
        </form>
      </Container>
  )
}

export default UpdateProfile