import {
  Avatar,
  Button,
  Container,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
  Image,
  Input,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { fileUploadCss } from "../Auth/Register";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromPlayList,
  updateProfilePicture,
} from "../../redux/actions/profile";
import { loadUser } from "../../redux/actions/user";
import toast from "react-hot-toast";
import { cancelSubscription } from "../../redux/actions/payment";

const Profile = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const { loading, message, error } = useSelector((state) => state.profile);
  const {
    loading: subscriptionLoading,
    message: subscriptionMessage,
    error: subscriptionError,
  } = useSelector((state) => state.subscription);

  const removeFromPlaylistHandler = async (id) => {
    await dispatch(removeFromPlayList(id));
    dispatch(loadUser());
  };

  const cancelSubscriptionHandler = () => {
    dispatch(cancelSubscription());
  };

  const ChangeImageSubmitHandler = async (e, image) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("file", image);
    await dispatch(updateProfilePicture(myForm));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }

    if (subscriptionMessage) {
      toast.success(subscriptionMessage)
      dispatch({type :'clearMessage'})
      dispatch(loadUser( ))
    }

    if (subscriptionError) {
      toast.error
      (subscriptionError)
      dispatch({type :'clearError'})
    }

  }, [dispatch, error, message,subscriptionError,subscriptionMessage]);

  return (
    <>
      <Container minH={"95vh"} maxW={"container.lg"} py={"8"}>
        <Heading m={"8"} textTransform={"uppercase"}>
          Profile
        </Heading>

        <Stack
          justifyContent={"flex-start"}
          direction={["column", "row"]}
          alignItems={"center"}
          spacing={["8", "16"]}
          p={"8"}
        >
          <VStack>
            <Avatar boxSize={"48"} src={user.avatar.url} />
            <Button onClick={onOpen} colorScheme="red" variant={"ghost"}>
              Change Photo
            </Button>
          </VStack>

          <VStack spacing={"4"} alignItems={["center", "flex-start"]}>
            <HStack>
              <Text children="Name" fontWeight={"bold"} />
              <Text children={user.name} />
            </HStack>

            <HStack>
              <Text children="Email" fontWeight={"bold"} />
              <Text children={user.email} />
            </HStack>

            <HStack>
              <Text children="CreatedAt" fontWeight={"bold"} />
              <Text children={user.createdAt.split("T")[0]} />
            </HStack>

            {user.role !== "admin" && (
              <HStack>
                <Text children="Subscription" fontWeight={"bold"} />
                {user.subscription && user.subscription.status === "active" ? (
                  <Button
                    isLoading={subscriptionLoading}
                    onClick={cancelSubscriptionHandler}
                    color={"yellow.500"}
                    variant="unstyled"
                  >
                    Cancel Subscriptions
                  </Button>
                ) : (
                  <Link to="/subscribe">
                    <Button colorScheme={"red"}>Subscribe</Button>
                  </Link>
                )}
              </HStack>
            )}

            <Stack direction={["column", "row"]} alignItems={"center"}>
              <Link to={"/updateProfile"}>
                <Button>Update Profile</Button>
              </Link>

              <Link to={"/changePassword"}>
                <Button>Change Password</Button>
              </Link>
            </Stack>
          </VStack>
        </Stack>

        <Heading children="Playlist" size={"8"} my={"8"} />

        {user.playlist.length > 0 && (
          <Stack
            direction={["column", "row"]}
            alignItems={"center"}
            flexWrap={"wrap"}
            p={"4"}
          >
            {user.playlist.map((element) => (
              <VStack w={"48"} key={element.course}>
                <Image
                  boxSize={"full"}
                  objectFit={"contain"}
                  src={element.poster}
                />

                <HStack>
                  <Link to={`/course/${element.course}`}>
                    <Button variant={"ghost"} colorScheme="red">
                      Watch Now
                    </Button>
                  </Link>
                  <Button
                    onClick={() => removeFromPlaylistHandler(element.course)}
                  >
                    <RiDeleteBin7Fill />
                  </Button>
                </HStack>
              </VStack>
            ))}
          </Stack>
        )}

        <ChangePhotoBox
          isOpen={isOpen}
          onClose={onClose}
          ChangeImageSubmitHandler={ChangeImageSubmitHandler}
          loading={loading}
        />
      </Container>
    </>
  );
};

export default Profile;

function ChangePhotoBox({
  isOpen,
  onClose,
  ChangeImageSubmitHandler,
  loading,
}) {
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");

  const ChangeImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const closeHandler = () => {
    onClose();
    setImagePrev("");
    setImage("");
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={closeHandler}>
        <ModalOverlay backdropFilter={"blur(10px)"} />
        <ModalContent>
          <ModalHeader>Change Photo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container>
              <form onSubmit={(e) => ChangeImageSubmitHandler(e, image)}>
                <VStack spacing={"8"}>
                  {imagePrev && <Avatar src={imagePrev} boxSize="48" />}

                  <Input
                    type="file"
                    focusBorderColor="red.200"
                    css={{ "&::file-selector-button": fileUploadCss }}
                    onChange={ChangeImage}
                  />
                  <Button
                    isLoading={loading}
                    type="submit"
                    w="full"
                    colorScheme="red"
                  >
                    Change
                  </Button>
                </VStack>
              </form>
            </Container>
          </ModalBody>

          <ModalFooter>
            <Button mr={"3"} onClick={closeHandler}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
