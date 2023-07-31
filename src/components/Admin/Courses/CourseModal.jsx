import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Grid,
  Box,
  Heading,
  Stack,
  Text,
  VStack,
  Input,
  ModalFooter,
} from "@chakra-ui/react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { fileUploadCss } from "../../Auth/Register";

const CourseModal = ({
  isOpen,
  onClose,
  id,
  deleteButtonHandler,
  courseTitle,
  lectures = [1,2,3,4,5,6,7,8],
  addLectureHandler,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setVideo("");
    setVideoPrev("");
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        size={"full"}
        onClose={handleClose}
        scrollBehavior={"outside"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{courseTitle}</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody p={"16"}>
            <Grid templateColumns={["1fr", "3fr 1fr"]}>
              <Box px={["0", "16"]}>
                <Box my={"5"}>
                  <Heading children={courseTitle} />
                  <Heading children={`#${id}`} size={"sm"} opacity={"0.4"} />
                </Box>
                <Heading children={"Lectures"} size={"lg"} />

                {lectures.map((item,i)=>(

<VideoCard
key={i}
title={"Web Development"}
description={"new Course"}
num={1}
lectureId={"sfj"}
courseId={id}
deleteButtonHandler={deleteButtonHandler}
/>


                ))

                }
              
              </Box>
              <Box>
                <form
                  onSubmit={(e) =>
                    addLectureHandler(e, id, title, description, video)
                  }
                >
                  <VStack spacing={"4"}>
                    <Heading size={"md"} textTransform={"uppercase"}>
                      Add Lecture
                    </Heading>

                    <Input
                      type="text"
                      placeholder="Title .."
                      value={title}
                      name="title"
                      id="title"
                      focusBorderColor="red.200"
                      onChange={(e) => setTitle(e.target.value)}
                    />

                    <Input
                      type="text"
                      placeholder="description .."
                      value={description}
                      name="description"
                      id="description"
                      focusBorderColor="red.200"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <Input
                      required
                      accept="video/mp4"
                      type="file"
                      focusBorderColor="red.200"
                      css={{
                        "&::file-selector-button": fileUploadCss,
                      }}
                      onChange={changeVideoHandler}
                    />

                    {videoPrev && (
                      <video
                        controlsList="nodownload"
                        controls
                        src={videoPrev}
                      ></video>
                    )}
                    <Button type="submit" width={"full"} colorScheme="red">
                      Upload
                    </Button>
                  </VStack>
                </form>
              </Box>
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CourseModal;

function VideoCard({
  title,
  description,
  num,
  lectureId,
  courseId,
  deleteButtonHandler,
}) {
  return (
    <>
      <Stack
        direction={["column", "row"]}
        my={"8"}
        borderRadius={"lg"}
        boxShadow={"0 0 10px rgba(107,70,193,0.5)"}
        justifyContent={["flex-start", "space-between"]}
        p={["4", "8"]}
      >
        <Box>
          <Heading size={"sm"} children={`#${num} ${title}`} />
          <Text children={description} />
        </Box>
        <Button
          color={"red.400"}
          onClick={() => deleteButtonHandler(courseId, lectureId)}
        >
          <RiDeleteBin5Fill />
        </Button>
      </Stack>
    </>
  );
}
