import React from "react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { GrLogout } from "react-icons/gr";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Image,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BiMenuAltLeft } from "react-icons/Bi";
import { RiDashboardFill } from "react-icons/ri";
import img2 from "../../assets/images/study1.png";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/user";

const LinkButton = ({ url = "/", title = "Home", onClose }) => {
  return (
    <Link to={url} onClick={onClose}>
      <Button variant={"ghost"}>{title}</Button>
    </Link>
  );
};

const Header = ({ isAuthenticated = false, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();


  const dispatch = useDispatch()

  //  For Logout
  const logoutHandler = () => {

    
    onClose();

    dispatch(logout())
  };

  return (
    <>
      <ColorModeSwitcher />
      <Button
        onClick={onOpen}
        color={"white"}
        backgroundColor={"red.400"}
        width={"12"}
        height={"12"}
        borderRadius={"50%"}
        position={"fixed"}
        top={"6"}
        left={"6"}
        zIndex={"1"}
      >
        <BiMenuAltLeft />
      </Button>
      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay
          backdropFilter={"blur(1000px)"}
          background={
            "linear-gradient(to bottom right, rgba(255,0,0,0), rgba(255,0,0,1))"
          }
          opacity={"0.5"}
        >
          <Image
            className="vectorImage2"
            boxSize={"600"}
            src={img2}
            objectFit={"contain"}
            position={"absolute"}
            right={"300"}
            top={"20"}
            borderRight={"50%"}
          />
        </DrawerOverlay>
        <DrawerContent>
          <DrawerHeader borderBottomWidth={"1"}>COURSE MART</DrawerHeader>
          <DrawerBody>
            <VStack spacing={"6"} alignItems={"Flex-start"}>
              <LinkButton onClose={onClose} url={"/"} title={"Home"} />
              <LinkButton
                onClose={onClose}
                url={"/courses"}
                title={" All Courses"}
              />
              <LinkButton
                onClose={onClose}
                url={"/request"}
                title={"Buy a Course"}
              />
              <LinkButton
                onClose={onClose}
                url={"/contact"}
                title={"ContactUs"}
              />
              <LinkButton onClose={onClose} url={"/about"} title={"About "} />

              <HStack
                justifyContent={"space-evenly"}
                position={"absolute"}
                bottom={"2rem"}
                width={"80%"}
              >
                {isAuthenticated ? (
                  <>
                    <VStack>
                      <HStack>
                        <Link onClick={onClose} to={"/profile"}>
                          <Button variant={"ghost"} colorScheme={"linkedin"}>
                            Profile
                          </Button>
                        </Link>

                        <Button variant={"ghost"} onClick={logoutHandler}>
                          <GrLogout style={{ margin: "5px" }} />
                          LogOut
                        </Button>
                      </HStack>

                      {user && user.role === "admin" && (
                        <Link onClick={onClose} to={"/admin/dashBoard"}>
                          <Button colorScheme={"purple"} variant={"ghost"}>
                            <RiDashboardFill style={{ margin: "5px" }} />
                            Dashboard
                          </Button>
                        </Link>
                      )}
                    </VStack>
                  </>
                ) : (
                  <>
                    <Link to={"/login"} onClick={onClose}>
                      <Button variant={"outline"} colorScheme={"red"}>
                        Login
                      </Button>
                    </Link>

                    <p>or</p>

                    <Link onClick={onClose} to={"/register"}>
                      <Button colorScheme={"red"} variant={"outline"}>
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
