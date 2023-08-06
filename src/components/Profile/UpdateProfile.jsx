import { Container, Heading, VStack, Input, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { updateProfile } from "../../redux/actions/profile";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../redux/actions/user";
import { useNavigate } from "react-router-dom";


const UpdateProfile = ({user}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const navigate = useNavigate()
const dispatch = useDispatch()
  const updateProfileSubmitHandler = async (e) => {
    e.preventDefault();

  await dispatch(updateProfile(name,email));
  dispatch(loadUser())
  navigate('/profile')
  };


  const{loading}=useSelector(state=>state.profile)
  return (
    
    <Container py="16" minH={"90vh"}>
      <form onSubmit={updateProfileSubmitHandler}>
        <Heading
          textTransform={"uppercase"}
          children="Update Profile"
          my="16"
          textAlign={["center", "left"]}
        />

        <VStack spacing={"8"}>
          <Input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            type={"text"}
            focusBorderColor="red.500"
          />

          <Input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type={"email"}
            focusBorderColor="red.500"
          />

          <Button
          isLoading={loading}
            w="full"
            colorScheme={"red"}
            type="submit"
          >
            Update Profile
          </Button>
        </VStack>
      </form>
    </Container>
  
  )
}

export default UpdateProfile