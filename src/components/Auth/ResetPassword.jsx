import { Container, Heading, VStack, Input, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import {useParams} from 'react-router-dom'
import { resetPassword } from "../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");

  const params = useParams()
  // console.log(params.token);






  const{loading,message,error} = useSelector(state=>state.profile)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onsubmitHandler =(e)=>{
    e.preventDefault()


    dispatch(resetPassword(params.token,password))
  }
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      navigate('/login')
    }
  }, [dispatch, error, message]);
  return (
    <Container minH={"95vh"} py={"16"}>
    <form onSubmit={onsubmitHandler}>
      <Heading
        children="Reset Password"
        my={"16"}
        textTransform={"uppercase"}
        textAlign={["center", "left"]}
      />
      <VStack spacing={"8"}>
        <Input
          required
          type="password"
          placeholder="password...."
          value={password}
          name="password"
          focusBorderColor="red.200"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button isLoading={loading} type="submit" colorScheme="red" w={"full"}>
          Reset password
        </Button>
      </VStack>
    </form>
  </Container>  )
}

export default ResetPassword