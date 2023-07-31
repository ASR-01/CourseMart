import {
  Button,
  Container,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Courses = () => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");


  const addToPlayListHandler=()=>{

    console.log("Added");
  }

  const categories = [
    "Web Development",
    "Data Structure",
    "Data Science",
    "Game Developer",
    "App DeveLopment",
  ];

  const Course = ({
    views,
    title,
    imageSrc,
    addToPlayListHandler,
    creator,
    description,
    Lecture,
    id,
  }) => {
    return (
      <>
        <VStack className="course" alignItems={["center", "flex-start"]   }
        
        
        >
          <Image src={imageSrc} boxSize="60" objectFit={"contain"} />

          <Heading
            textAlign={["center", "left"]}
            maxW={"200px"}
            noOfLines={2}
            children={title}
            size={"sm"}
          />

          <Text noOfLines={2} children={description} />

          <HStack>
            <Text
              fontWeight={"bold"}
              children={"Creator"}
              textTransform={"uppercase"}
            />
            <p>:</p>
            <Text
              fontFamily={"body"}
              textTransform={"uppercase"}
              children={creator}
            />
          </HStack>

          <Heading
            textAlign={"center"}
            size={"xs"}
            textTransform={"uppercase"}
            children={`Lectures : ${Lecture}`}
          />

          <Heading
            size={"xs"}
            textTransform={"uppercase"}
            children={`Views : ${views}`}
          />
          <Stack direction={["column", "row"]} alignItems={"center"}>
            <Link to={`/course/${id}`}>
              <Button colorScheme="red">Watch Now </Button>
            </Link>
            <Button
              colorScheme="red"
              onClick={() => addToPlayListHandler(id)}
              variant={"ghost"}
            >
              Add to playlist{" "}
            </Button>
          </Stack>
        </VStack>
      </>
    );
  };

  return (
    <Container minH={"95vh"} maxW={"container.lg"} paddingY={"8"}
    my={'10'}

    
    
    >
      <Heading children="All Courses" m={"8"} />

      <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search...."
        type="text"
        width={"70%"}
        focusBorderColor="pink.200"
      />
      <HStack
        mt={"5"}
        overflowX={"auto"}
        paddingY={"8"}
        css={{
          "&::-webKit-scrollbar": {
            display: "none",
          },
        }}
      >
        {categories.map((item, index) => {
          return (
            <Button key={index} onClick={() => setCategory(item)} minW={"60"}>
              <Text children={item} />
            </Button>
          );
        })}
      </HStack>

      <Stack
        direction={["column", "row"]}
        flexWrap={"wrap"}
        justifyContent={["flex-start", "space-evenly"]}
        alignItems={["center", "flex-start"]}
      >
        <Course
          title={"Sample1"}
          description={"Sample1"}
          views={23}
          id={"sample"}
          creator={"Sample"}
          Lecture={2}
          addToPlayListHandler={addToPlayListHandler}
        />
      </Stack>
    </Container>
  );
};

export default Courses;
