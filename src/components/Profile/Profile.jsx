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
import React, { useState } from "react";
import { Link } from "react-router-dom";
import img3 from "../../assets/images/study3.png";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { fileUploadCss } from "../Auth/Register";

const Profile = () => {
  const removeFromPlaylist = (id) => {
    console.log(id);
  };

  const user = {
    name: " Aditya",
    email: "Adi123@gmail.com",
    CreatedAt: String(new Date().toISOString()),
    role: "user",
    subscription: {
      status: "active",
    },

    playlist: [
      {
        id: "HELLO",
        course: "as",
        poster: img3,
      },
    ],
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const ChangeImageSubmitHandler = (e, image) => {
    e.preventDefault()




  };

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
            <Avatar boxSize={"48"} />
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
              <Text children={user.CreatedAt.split("T")[0]} />
            </HStack>

            {user.role !== "admin" ? (
              <>
                <HStack>
                  <Text children="Subscription" fontWeight={"bold"} />
                  {user.subscription.status === "active" ? (
                    <>
                      <Button color="red.400" variant={"link"}>
                        Cancel The Subscription
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to={"/subscribe"}>
                        <Button colorScheme="red">Subscribe</Button>
                      </Link>
                    </>
                  )}
                </HStack>
              </>
            ) : (
              <></>
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
                  <Button onClick={() => removeFromPlaylist(element.id)}>
                    <RiDeleteBin7Fill />
                  </Button>
                </HStack>
              </VStack>
            ))}
          </Stack>
        )}

        <ChangePhotoBox isOpen={isOpen} onClose={onClose} ChangeImageSubmitHandler={ChangeImageSubmitHandler} />
      </Container>
    </>
  );
};

export default Profile;

function ChangePhotoBox({ isOpen, onClose, ChangeImageSubmitHandler }) {
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



  const closeHandler =()=>{
    onClose()
    setImagePrev('')
    setImage('')
  }
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
                  <Button type="submit" w="full" colorScheme="red">
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
