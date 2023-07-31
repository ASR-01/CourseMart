import { Box, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import video from "../../assets/videos/video.mp4";

const CoursePage = () => {
  const lectureTitle = "lecture title";
  const [lectureNumber, setLectureNumber] = useState(0);
  const lectures = [
    {
      _id: 1,
      title: "Sample 1",
      description: "Sample First Description",
      video: {
        url: "SAajs",
      },
    },

    {
      _id: 2,
      title: "Sample 2",
      description: "Sample First Description",
      video: {
        url: "SAajs",
      },
    },
    {
      _id: 3,
      title: "Sample 3",
      description: "Sample First Description",
      video: {
        url: "SAajs",
      },
    },
    {
      _id: 4,
      title: "Sample 4",
      description: "Sample First Description",
      video: {
        url: "SAajs",
      },
    },
    {
      _id: 5,
      title: "Sample 5",
      description: "Sample First Description",
      video: {
        url: "SAajs",
      },
    },
  ];

  return (
    <>
      <Grid  minH={"90vh"} templateColumns={["1fr", "3fr 1fr"]}>
        <Box>
          <video
            width={"100%"}
            controls
            controlsList="nodownload noremoteplayback "
            disablePictureInPicture
            disableRemotePlayback
            src={video}
          ></video>

          <Heading
            children={`#${lectureNumber + 1} ${lectures[lectureNumber].title}`}
            m={"4"}
          />

          <Heading children={`Description`} m={"4"} />
          <Text m={"4"} children={lectures[lectureNumber].description} />
        </Box>

        <VStack>
          {lectures.map((element, index) => (
            <button
              key={element._id}
              style={{
                width: "100%",
                padding: "1rem",
                textAlign: "center",
                margin: 0,
                borderBottom: "1px solid black",
              }}
              onClick={() => setLectureNumber(index)}
            >
              <Text noOfLines={1}>
                #{index + 1} {element.title}
              </Text>
            </button>
          ))}
        </VStack>
      </Grid>
    </>
  );
};

export default CoursePage;
