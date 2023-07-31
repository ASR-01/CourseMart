import { Box, HStack, Heading, Stack, VStack } from "@chakra-ui/react";
import React from "react";
import { CgFacebook, CgInstagram, CgYoutube } from "react-icons/cg";

const Footer = () => {
  return (
    <Box padding={4} bg={"blackAlpha.800"} minH={"10vh"}>
      <Stack direction={["column", "row"]}>
        <VStack alignItems={["center", "flex-start"]} width={'full'}>
          <Heading children="Alright Reserved" color={"white"} />
          <Heading
            children="@ ASR CODER"
            fontFamily={"body"}
            size={"sm"}
            color={"red.400"}
          />
        </VStack>

        <HStack
          spacing={["2", "10"]}
          justifyContent={['center']}
          color={"white"}
          fontSize={"40"}
        >
          <a href="http://youtube.com" target="_blank">
            <CgFacebook />
          </a>
          <a href="http://youtube.com">
            <CgInstagram />
          </a>
          <a href="http://youtube.com">
            <CgYoutube />
          </a>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Footer;
