import {
  Avatar,
  Container,
  Heading,
  Stack,
  VStack,
  Text,
  Button,
  Box,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import img1 from "../../assets/images/study.png";
import { Link } from "react-router-dom";
import video from "../../assets/videos/video.mp4";
import { RiSecurePaymentFill } from "react-icons/ri";
import data from "../../assets/docs/termsAndConditions";

const Founder = () => {
  return (
    <>
      <Stack direction={["column", "row"]} spacing={["4", "16"]} padding={"8"}>
        <VStack>
          <Avatar src={img1} boxSize={["40", "48"]} />
          <Text children="Co-founder" opacity={"0.5"} />
        </VStack>
        <VStack justifyContent={"center"} alignItems={["center", "flex-start"]}>
          <Heading children="Aditya Rawat" size={["md", "xl"]} />
          <Text
            textAlign={["center", "left"]}
            children="HI, I am Full Stack Developer and a Gamer My mission is to be the world Richest Man alive"
          />
        </VStack>
      </Stack>
    </>
  );
};

const Vedioplayer = () => (
  <>
    <Box>
      <video
        autoPlay
        muted
        loop
        controls
        controlsList="nodownload nofullscreen noremoteplayback "
        disablePictureInPicture
        disableRemotePlayback
        src={video}
      ></video>
    </Box>
  </>
);

 


const About = () => {
  return (
    <>
      <Container maxW={"container.lg"} padding={"16"} boxShadow={"dark-lg"}>
        <Heading children={"About Us"} textAlign={["center", "left"]} />
        <Founder />
        <Stack m={"8"} direction={["column", "row"]} alignItems={"center"}>
          <Text fontFamily={"body"} m="8" textAlign={["center", "left"]}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
            commodi animi porro reprehenderit dolores ut laudantium ullam
            exercitationem, labore aspernatur nulla magni maxime.
          </Text>

          <Link to={"/subscribe"}>
            <Button variant={"ghost"} colorScheme={"red"}>
              CheckOut our Plan
            </Button>
          </Link>
        </Stack>

        <Vedioplayer />

        <Box>
          <Heading
            size={"md"}
            children={"Terms & Conditions"}
            textAlign={["center", "left"]}
            my={"4"}
          />

          <Box h={"xs"} p={"8"} overflowY={"scroll"}>
            <Text
              textAlign={["center", "left"]}
              letterSpacing={"widest"}
              fontFamily={"body"}
            >
              {data}
            </Text>
            <Heading
              m={"4"}
              size={"xs"}
              children={"Refund Only available within 7 Days"}
            />
          </Box>
        </Box>

        <HStack my={"4"} p={"4"}>
          <RiSecurePaymentFill />
          <Heading
            size={"xs"}
            children={"Payment Is secure by Razor Pay"}
            fontFamily={"body"}
            textTransform={"uppercase"}
          />
        </HStack>
      </Container>
    </>
  );
};

export default About;
