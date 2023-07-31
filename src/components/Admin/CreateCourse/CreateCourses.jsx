import {
  Container,
  Grid,
  Heading,
  VStack,
  Input,
  Select,
  Button,
  Img,
} from "@chakra-ui/react";
import React, { useState } from "react";
import SideBar from "../SideBar";
import { fileUploadCss } from "../../Auth/Register";

const CreateCourses = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [category, setCategory] = useState("");
  const [Image, setImage] = useState();
  const [ImagePrev, setImagePrev] = useState("");

  const categories = [
    "Web Development",
    "Data Structure",
    "Data Science",
    "Game Developer",
    "App DeveLopment",
  ];

  const ChangeFileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  return (
    <>
      <Grid minH={"100vh"} templateColumns={["1fr", "5fr 1fr"]}>
        <Container py={"16"}>
          <form>
            <Heading
              children="Create Course"
              textTransform={"uppercase"}
              my={"16"}
              textAlign={["center", "left"]}
            />
            <VStack m={"auto"} spacing={"8"}>
              <Input
                type="text"
                placeholder=" title "
                value={title}
                name="title"
                focusBorderColor="red.200"
                onChange={(e) => setTitle(e.target.value)}
              />

              <Input
                type="text"
                placeholder="  description "
                value={description}
                name="description"
                focusBorderColor="red.200"
                onChange={(e) => setDescription(e.target.value)}
              />

              <Input
                type="text"
                placeholder=" username"
                value={createdBy}
                name="createdBy"
                focusBorderColor="red.200"
                onChange={(e) => setCreatedBy(e.target.value)}
              />

              <Select
                focusBorderColor="red.200"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value={""}>Category</option>
                {categories.map((item) => (
                  <>
                    <option value={item} key={item}>
                      {item}
                    </option>
                  </>
                ))}
              </Select>

              <Input
                required
                accept="/*"
                type="file"
                focusBorderColor="red.200"
                css={{
                  "&::file-selector-button": fileUploadCss,
                }}
                onChange={ChangeFileHandler}
              />

              {Image && (
                <Img src={ImagePrev} bgSize={"64"} objectFit={"contain"}></Img>
              )}

              <Button w={"full"} type="submit" colorScheme="red">
                Create
              </Button>
            </VStack>
          </form>
        </Container>
        <SideBar />
      </Grid>
    </>
  );
};

export default CreateCourses;
