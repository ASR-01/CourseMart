import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import SideBar from "../SideBar";
import { RiDeleteBin4Fill } from "react-icons/ri";
import img1 from "../../../assets/images/study.png";
import CourseModal from "./CourseModal";

const AdminCourses = () => {
  const courses = [
    {
      _id: " 1",
      title: "Adi",
      poster: {
        url: img1,
      },

      category: "Web Development",
      createdBy: "ASR",
      views: 123,
      numOfVideos: 12,
    },
  ];
  const { isOpen, onClose, onOpen } = useDisclosure();

  const courseDetailsHandler = (userId) => {
    onOpen();
  };
  const deleteUserHandler = (userId) => {
    console.log(userId);
  };

  const deleteLectureButtonHandler = (courseId, lectureId) => {
    console.log(lectureId);
    console.log(courseId);
  };
  const addLectureHandler = (e, courseId, title, description, video) => {
    e.preventDefault();
  };
  return (
    <Grid minH={"100vh"} templateColumns={["1fr", "5fr 1fr"]}>
      <Box p={["0", "8"]}>
        <Heading
          children="All Courses"
          textTransform={"uppercase"}
          my={"16"}
          textAlign={["center", "left"]}
        />
        <TableContainer w={["100vw", "full"]}>
          <Table variant={"simple"} size={"lg"}>
            <TableCaption>All Available Courses In the Database</TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Title</Th>
                <Th>Poster</Th>
                <Th>Category</Th>
                <Th>Creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {courses.map((item) => {
                return (
                  <>
                    <Rows
                      key={item._id}
                      item={item}
                      deleteUserHandler={deleteUserHandler}
                      courseDetailsHandler={courseDetailsHandler}
                    />
                  </>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        <CourseModal
          isOpen={isOpen}
          onClose={onClose}
          id={"Yo"}
          deleteLectureButtonHandler={deleteLectureButtonHandler}
          addLectureHandler={addLectureHandler}
          courseTitle={"React Course"}
        />
      </Box>

      <SideBar />
    </Grid>
  );
};

export default AdminCourses;

function Rows({ item, courseDetailsHandler, deleteUserHandler }) {
  return (
    <Tr>
      <Td>{item._id}</Td>
      <Td>{item.title}</Td>
      <Td>
        <Image src={item.poster.url} />
      </Td>

      <Td textTransform={"uppercase"}> {item.category}</Td>
      <Td> {item.createdBy}</Td>

      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>

      <Td isNumeric>
        <HStack justifyContent={"flex-end"}>
          <Button
            onClick={() => courseDetailsHandler(item._id)}
            variant={"outline"}
            color="red.500"
          >
            View Lecture
          </Button>

          <Button
            variant={"outline"}
            color="red.600"
            onClick={() => deleteUserHandler(item._id)}
          >
            <RiDeleteBin4Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
