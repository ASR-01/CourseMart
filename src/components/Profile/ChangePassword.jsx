import { Container, Heading, VStack, Input, Button } from "@chakra-ui/react";
import React, { useState } from "react";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();

  const ChangePasswordSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Container py={"16"} minH={"92vh"}>
        <form onSubmit={ChangePasswordSubmitHandler}>
          <Heading
            children={"Change Password"}
            my={"16"}
            textAlign={["center", "left"]}
            textTransform={"uppercase"}
          />
          <VStack spacing={"8"} boxShadow={'dark-lg'}>
            <Input
              required
              type="password"
              placeholder="Enter old password"
              value={oldPassword}
              name="password"
              focusBorderColor="red.200"
              onChange={(e) => setOldPassword(e.target.value)}
            />

            <Input
              required
              type="password"
              placeholder="Enter New password"
              value={newPassword}
              name="password"
              focusBorderColor="red.200"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button colorScheme="red" type="submit" w={"full"}>
              Change
            </Button>
          </VStack>
        </form>
      </Container>
    </>
  );
};

export default ChangePassword;
