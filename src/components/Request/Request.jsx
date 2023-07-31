import {
    Container,
    Heading,
    VStack,
    Box,
    Button,
    FormLabel,
    
    Input,
    Textarea,
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  import { Link } from "react-router-dom";
  import img4 from "../../assets/images/study5.png";
  
const Request = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [course, setCourse] = useState("");
  
    return (
      <>
        <Container h={"92vh"} mt={"10"}>
          <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
            <Heading children={"Request New Skill"} />
  
            <form style={{ width: "100%" }}>
              <Box>
                <FormLabel htmlFor="name" children={"Name"} />
  
                <Input
                  type="text"
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
                <FormLabel htmlFor="course" children={"course"} />
  
                <Textarea
                  required
                  placeholder=" Explain your "
                  value={course}
                  id="course"
                  focusBorderColor="red.200"
                  onChange={(e) => setCourse(e.target.value)}
                />
              </Box>
  
              <Button my={"4"} colorScheme="red" type="submit">
                Send Mail
              </Button>
              <Box my={"4"}>
                See Available skills !{" "}
                <Link to={"/courses"}>
                  <Button colorScheme="red" variant={"link"}>
                    Click here
                  </Button>{" "}
                  here
                </Link>
              </Box>
            </form>
          </VStack>
        </Container>
    
        
      </>
      )
}

export default Request