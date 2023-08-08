import { Container, Heading, VStack, Input, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../../redux/actions/user";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");


  const{loading,message,error} = useSelector(state=>state.profile)

  const dispatch = useDispatch()
  const onsubmitHandler =(e)=>{
    e.preventDefault()


    dispatch(forgetPassword(email))
  }
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);
  return (
    <>
      <Container minH={"95vh"} py={"16"}>
        <form onSubmit={onsubmitHandler}>
          <Heading
            children="Forgot Password"
            my={"16"}
            textTransform={"uppercase"}
            textAlign={["center", "left"]}
          />
          <VStack spacing={"8"}>
            <Input
              required
              type="email"
              placeholder="abc@gmail.com"
              value={email}
              name="email"
              id="email"
              focusBorderColor="red.200"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button  isLoading={loading} type="submit" colorScheme="red" w={"full"}>
              Send Reset Link
            </Button>
          </VStack>
        </form>
      </Container>
    </>
  );
};

export default ForgetPassword;
