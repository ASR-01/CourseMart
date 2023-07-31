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
} from "@chakra-ui/react";
import React from "react";
import SideBar from "../SideBar";
import { RiDeleteBin4Fill } from "react-icons/ri";

const Users = () => {
  const users = [
    {
      _id: " 1",
      name: "Adi",
      email: "Asr@123",
      role: "admin",
      subscription: {
        status: "active",
      },
    },
  ];

  const updateHandler = (userId) => {
    console.log(userId);
  };
  const deleteUserHandler = (userId) => {
    console.log(userId);
  };
  return (
    <Grid minH={"100vh"} templateColumns={["1fr", "5fr 1fr"]}>
      <Box  p={['0','16']} overflow={'auto'}>
        <Heading
          children="All Users"
          textTransform={"uppercase"}
          my={"16"}
          textAlign={["center", "left"]}
        />
        <TableContainer w={["100vw", "full"]}>
          <Table variant={"simple"} size={"lg"}>
            <TableCaption>All Available Users In the Database</TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Subscription</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((item) => {
                return (
                  <>
                    <Row
                      key={item._id}
                      item={item}
                      deleteUserHandler={deleteUserHandler}
                      updateHandler={updateHandler}
                    />
                  </>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      <SideBar />
    </Grid>
  );
};

export default Users;

function Row({ item, updateHandler, deleteUserHandler }) {
  return (
    <Tr>
      <Td>{item._id}</Td>
      <Td>{item.name}</Td>

      <Td> {item.email}</Td>
      <Td> {item.role}</Td>

      <Td>{item.subscription.status === "active" ? "Active" : "Not Active"}</Td>

      <Td isNumeric>
        <HStack justifyContent={"flex-end"}>
          <Button
            onClick={() => updateHandler(item._id)}
            variant={"outline"}
            color="red.500"
          >
            Change Role
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
