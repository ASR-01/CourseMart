import { Button, VStack } from "@chakra-ui/react";
import React from "react";
import {
  RiAddCircleFill,
  RiDashboardFill,
  RiEyeFill,
  RiUser3Fill,
} from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  return (
    <VStack spacing={"8"} p={"16"}  boxShadow={"-7px 0 10px rgba(107,70,193,0.5)"} >
      <LinkButton
        Icon={RiDashboardFill}
        text={"DashBoard"}
        url={"dashboard"}
        active={location.pathname === "/admin/dashboard"}
      />
      <LinkButton
        Icon={RiAddCircleFill}
        text={"Create Course"}
        url={"createCourse"}
        active={location.pathname === "/admin/createCourse"}
      />

      <LinkButton
        Icon={RiEyeFill}
        text={"Courses"}
        url={"adminCourses"}
        active={location.pathname === "/admin/adminCourses"}
      />
      <LinkButton
        Icon={RiUser3Fill}
        text={"Users"}
        url={"users"}
        active={location.pathname === "/admin/users"}
      />
    </VStack>
  );
};

export default SideBar;

function LinkButton({ url, text, active, Icon }) {
  return (
    <Link to={`/admin/${url}`}>
      <Button
        fontSize={"larger"}
        colorScheme={active ? "red" : "red"}
        variant={active ? "solid" : "ghost"}
      >
        <Icon style={{ margin: "4px" }} />
        {text}
      </Button>
    </Link>
  );
}
 