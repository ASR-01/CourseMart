import {
  Heading,
  Stack,
  VStack,
  Text,
  Button,
  HStack,
  Image,
  Box,
} from "@chakra-ui/react";
import React from "react";
import "./home.css";

import { Link } from "react-router-dom";
import { CgGoogle, CgInstagram, CgYoutube } from "react-icons/cg";

import { SiCoursera, SiUdemy } from "react-icons/si";

import { DiAws } from "react-icons/di";
import img1 from "../../assets/images/study.png";
import video from "../../assets/videos/video.mp4";

const Home = () => {
  return (
    <section className="Home"
    
    
    >
      <div className="container">
        <Stack
          direction={["column", "row"]}
          height={"100%"}
          justifyContent={["center", "space-between"]}
          alignItems={"center"}
          spacing={["16", "56"]}
        >
          <VStack
            width={"full"}
            alignItems={["center", "flex-end"]}
            spacing={"8"}
          >
            <Heading
              textAlign={["center", "left"]}
              children={"Enhance Your Own SkillSet"}
              size={"2xl"}
            />
            <Text
              fontSize={"xl"}
              textAlign={["center", "left"]}
              children={" Learn with the King of Pirates Monkey D Luffy"}
            />
            <Link to={"/courses"}>
              <Button size={"lg"} 
              
color={'red.400'}              
              >
                Explore Now
              </Button>
            </Link>
          </VStack>

          <Image
            className="vectorImage"
            boxSize={"md"}
            src={img1}
            objectFit={"contain"}
          />
        </Stack>
      </div>

      <Box padding={"8"} backgroundColor={"black"}>
        <Heading textAlign={"center"} color={"red.400"}>
          OUR BRANDS
        </Heading>

        <HStack
          className="brandsBanner"
          justify={"space-evenly"}
          marginTop={"10"}
          alignItems={"center"}
          color={"red.400"}
        >
          <CgGoogle />
          <CgYoutube />
          <CgInstagram />
          <SiCoursera />
          <SiUdemy />
          <DiAws />
        </HStack>
      </Box>
      <div className="container2">
        <video
          // autoPlay
          controls
          controlsList="nodownload nofullscreen noremoteplayback "
          disablePictureInPicture
          disableRemotePlayback
          src={video}
        ></video>
      </div>
    </section>
  );
};

export default Home;
