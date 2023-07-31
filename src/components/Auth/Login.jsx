import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
  Image,
  Stack
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import img3 from "../../assets/images/study3.png";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/user";


const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

const dispatch = useDispatch()


  const submitHandler =(e)=>{
    e.preventDefault();
    dispatch(login(email,password))
  }
  return (
    <>
      <Container
        height={"100vh"}
        filter={"drop-shadow(0 20px 10px rgba(0, 0, 0, 0.3))"}
      >
        <VStack height={"full"} justifyContent={"center"} spacing={"16"}>
          <Heading
            children="Welcome to Course Mart"
            textAlign={"center"}
            fontFamily={"body"}
          />

          <form style={{ width: "100%" }}  onSubmit={submitHandler}>


            <Box my={"4"}>
              <FormLabel htmlFor="email" children={"Email Address"} />
              <Input
              type="email"
                placeholder="abc@gmail.com"
                value={email}
                name="email"
                id="email"
                focusBorderColor="red.200"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>

            <Box>
              <FormLabel htmlFor="password" children={"Password"} />

              <Input
              type="password"
                placeholder="password"
                value={password}
                name="password"
                id="password"
                focusBorderColor="red.200"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Box mt={"3"}>
              <Link to={"/forgotPassword"}>
                <Button fontSize={"sm"} colorScheme="red" variant={"ghost"}>
                  Forget Password
                </Button>
              </Link>
            </Box>

            <Button my={"4"} colorScheme="red" type="submit">
              Login
            </Button>
            <Box my={"4"}>
              New User?{" "}
              <Link to={"/register"}>
                <Button colorScheme="red" variant={"link"}>
                  Sign Up
                </Button>{" "}
                here
              </Link>
            </Box>
          </form>
        </VStack>



        <Stack m={"8"} direction={["column", "row"]} alignItems={"center"}>
        <Image
        className="vectorImage"
        position={"fixed"}
        bottom={["200", "16"]}
        right={["13", "8"]}
        height={["230", "200"]}
        src={img3}
/>
          </Stack>

      </Container>
     
      
    </>
  );
};

export default Login;
