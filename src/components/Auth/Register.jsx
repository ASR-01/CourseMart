import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
  Image,
  Avatar,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import img4 from "../../assets/images/study4.png";
import { useDispatch } from "react-redux";
import { register } from "../../redux/actions/user";

export const fileUploadCss = {
  cursor: "pointer",
  marginLeft: "-5%",
  width: "110%",
  border: "none",
  height: "100%",
  color: "red",
  backgroundColor: "white",
};

const fileUploadStyle = {
  "&::file-selector-button": fileUploadCss,
};

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState("");

 
const dispatch = useDispatch()
  const handleRegisterSubmit = (e)=>{
    e.preventDefault()

    const myForm = new FormData()
    myForm.append('name',name)
    myForm.append('email',email)
    myForm.append('password',password)
    myForm.append('file',image)

    dispatch(register(myForm))


  }



  const ChangeFileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
  };
  return (
    <>
      <Container
        height={"100vh"}
        filter={"drop-shadow(0 20px 10px rgba(0, 0, 0, 0.3))"}
      >
        <VStack height={"full"} justifyContent={"center"} spacing={"16"}>
          <Heading
            children="Registration"
            textTransform={"uppercase"}
            textAlign={"center"}
            fontFamily={"body"}
          />

          <form style={{ width: "100%" }} onSubmit={handleRegisterSubmit}>
            <Box my={"1"} display={"flex"} justifyContent={"center"}>
              <Avatar size={"xl"} src={imagePreview} />
            </Box>

            <Box>
              <FormLabel htmlFor="name" children={"Name"} />

              <Input
                type='text'
                placeholder="enter name .."
                value={name}
                name="name"
                id="name"
                focusBorderColor="red.200"
                onChange={(e) => setName(e.target.value)}
              />
            </Box>

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

            <Box>
              <FormLabel htmlFor="ChooseAvatar" children={"Choose Avatar"} />

              <Input
                accept="/*"
                type="file"
                id="Choose Avatar"
                focusBorderColor="red.200"
                css={fileUploadStyle}
                onChange={ChangeFileHandler}
              />
            </Box>

            <Button my={"4"} colorScheme="red" type="submit">
              Sigh Up
            </Button>
            <Box my={"4"}>
              Already Signed Up?{" "}
              <Link to={"/login"}>
                <Button colorScheme="red" variant={"link"}>
                  Login
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
            bottom={["10", "1"]}
            right={["0", "10"]}
            height={["170", "200"]}
            src={img4}
          />
        </Stack>
      </Container>
    </>
  );
};

export default Register;
