import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../redux/store";
import { buySubscription } from "../../redux/actions/payment";
import toast from "react-hot-toast";
import one from '../../assets/images/study1.png'

const Subscribe = ({user}) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState();
console.log(user);
  const { loading, error, subscriptionID } = useSelector(
    (state => state.subscription)
  );


  const {  error:courseError } = useSelector(
    (state => state.course)
  );








  const subscriptionHandler = async () => {
    const { data } = await axios.get(`${server}/razorPayKey`);
    setKey(data.key);
    dispatch(buySubscription());
    console.log(data);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (courseError) {
      toast.error(courseError);
      dispatch({ type: "clearError" });
    }

    if (subscriptionID) {
      const openPopUp = () => {
        const options = {
          key,
          name: "CourseMart",
          description: "Get access to all premium Content",
          image: one,
          subscription_id: subscriptionID,

          callback_url: `${server}/paymentVerification`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: "",
          },
          notes: {
            address: "ASR is Rich Man",
          },
          theme: {
            color: "#3399cc",
          },
        };
        const razor = new window.Razorpay(options);
        console.log(razor);
        razor.open();
      };
      openPopUp();
    }
  }, [dispatch, error,courseError, user.name, user.email, key, subscriptionID]);


  
  return (
    <Container h={"90vh"} p={"16"}>
      <Heading children="Welcome" my={"8"} textAlign={"center"} />
      <VStack boxShadow={"dark-lg"} alignItems={"stretch"} spacing={"0"}>
        <Box bg={"red.500"} p={"4"}>
          <Text children={`Pro Pack - ₹444`} color={"black"} />
        </Box>

        <Box p={"4"}>
          <VStack textAlign={"center"} px={"8"} mt={"8"}>
            <Text
              children={`Join Pro Pack and get access to all Courses.`}
              colorScheme={"black"}
            />
            <Heading size={"md"} children={`₹444 only`} />
          </VStack>

          <Button
            my={"8"}
            w={"full"}
            bg="red.500"
            onClick={subscriptionHandler}
            isLoading={loading}

          >
            Buy Now
          </Button>
        </Box>

        <Box bg={"blackAlpha.800"} p={"4"}>
          <Heading
            color={"white"}
            size={"sm"}
            children={`100% Refund at Cancellation`}
            textTransform={"uppercase"}
          />
          <Text fontSize={"xs"} color={"white"}>
            *Terms And Condition Apply
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default Subscribe;
