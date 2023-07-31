import {
  Box,
  Grid,
  HStack,
  Heading,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import SideBar from "../SideBar";
import { RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";
import { DoughnutGraph, LineChart } from "./Chart";
const DataBox = ({ title, qty, qtyPercentage, profit }) => {
  return (
    <>
      <Box
        w={["full", "20%"]}
        boxShadow={"-5px 0 10px rgba(107,70,193,0.5)"}
        borderRadius={"lg"}
        p={"8"}
      >
        <Text children={title} />
        <HStack spacing={"6"}>
          <Text fontSize={"2xl"} fontWeight={"bold"} children={qty} />

          <HStack>
            <Text children={`${qtyPercentage}%`} />
            {profit ? (
              <RiArrowUpLine color="green" />
            ) : (
              <RiArrowDownLine color="red" />
            )}
          </HStack>
        </HStack>
        <Text children={"Since Last Month"} opacity={"0.5"} />
      </Box>
    </>
  );
};

const Bar = ({ title, value, profit }) => {
  return (
    <>
      <Box py="4" px={["0", "20"]}>
        <Heading size={"sm"} children={title} mb={"2"} />
        <HStack width={"full"} alignItems={"center"}>
          <Text children={profit ? "0%" : `-${value}%`} />
          <Progress
            width={"full"}
            value={profit ? value : 0}
            colorScheme="red"
          />
          <Text children={`${value > 100 ? value : 100}%`} />
        </HStack>
      </Box>
    </>
  );
};

const DashBoard = () => {
  return (
    <>
      <Grid minH={"100vh"} templateColumns={["1fr", "5fr 1fr"]}>
        <Box boxSizing="border-box" py={"16"} px={["4", "0"]}>
          <Text
            textAlign={"center"}
            opacity={"0.5"}
            children={`Last Change was on ${String(new Date()).split("G")[0]}`}
          />

          <Heading
            children="Dashboard"
            ml={["0", "16"]}
            mb={"16"}
            textAlign={["center", "left"]}
          />

          <Stack
            className="dataBox"
            direction={["column", "row"]}
            minH={"24"}
            justifyContent={"space-evenly"}
          >
            <DataBox title="Views" qty={123} qtyPercentage={30} profit={true} />
            <DataBox title="Users" qty={50} qtyPercentage={50} profit={true} />
            <DataBox
              title="Subscription"
              qty={20}
              qtyPercentage={90}
              profit={false}
            />
          </Stack>
          <Box
            m={["0", "16"]}
            borderRadius={"lg"}
            p={["0", "16"]}
            mt={["4", "16"]}
            boxShadow={"-5px 0 10px rgba(107,70,193,0.5)"}
          >
            <Heading
              textAlign={["center", "left"]}
              size={"md"}
              children={"Views Graph"}
              ml={["0", "16"]}
              pt={["8", "0"]}
            />
            <LineChart />
          </Box>
          <Grid templateColumns={["1fr", "2fr 1fr"]}>
            <Box p={"4"}>
              <Heading
                textAlign={["center", "left"]}
                size={"md"}
                children=" Progress Bar"
                my={"8"}
                ml={["0", "16"]}
              />

              <Box>
                <Bar profit={true} title="Views" value={30} />
                <Bar profit={true} title="Users" value={50} />
                <Bar profit={false} title="Subscription" value={0} />
              </Box>
            </Box>

            <Box p={["0", "16"]} boxSizing={"border-box"} py={"4"}>
              <Heading
                textAlign={"center"}
                mb={"4"}
                size={"md"}
                children={"Users"}
              />



              {/* Graph */}
              <DoughnutGraph/>
            </Box>
          </Grid>
        </Box>

        <SideBar />
      </Grid>
    </>
  );
};

export default DashBoard;
