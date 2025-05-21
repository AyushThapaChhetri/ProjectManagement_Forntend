// import React from 'react'
// import { RxHamburgerMenu } from "react-icons/rx";
import { Box, Button, Flex } from "@chakra-ui/react";
import DrawerHamburger from "./Drawer/DrawerHamburger";

// import { Icon } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <>
      <Flex
        as="nav"
        justify="space-between"
        align="center"
        px={{ base: "6", wide: "20" }}
        py={3}
        // boxShadow="sm"
        h={{ base: "5rem", wide: "4rem" }}
        // h="20vh"
        // bg={"red"}
        borderWidth="1px"
        width="100%"
        // overflow="auto"
      >
        {/* Logo or Company Name */}
        <Box fontWeight="bold" fontSize={{ base: "md", tabletLg: "lg" }}>
          FocusTrack
        </Box>

        {/* Nav Links */}
        <Flex
          gap={6}
          align="center"
          display={{ base: "none", tabletLg: "flex" }}
        >
          <Box cursor="pointer">Product</Box>
          <Box cursor="pointer">About Us</Box>
          <Box cursor="pointer">Contact</Box>
        </Flex>

        {/* Auth Buttons */}
        <Flex gap={3} display={{ base: "none", tabletLg: "flex" }}>
          <Button
            bgColor="white"
            color="black"
            borderRadius="2xl"
            h="30px"
            fontSize="sm"
            _hover={{
              bg: "purple.400",
              color: "white",
            }}
            asChild
          >
            <a href="login">Log In</a>
          </Button>
          <Button
            bg="#bd53e6"
            color="white"
            borderRadius="2xl"
            fontSize="sm"
            h="30px"
            _hover={{ bg: "purple.400" }}
            asChild
          >
            <a href="signUp">Sign Up</a>
          </Button>
        </Flex>
        {/* <Icon size="lg" display={{ base: "block", md: "none" }}>
          <RxHamburgerMenu />
        </Icon> */}
        <DrawerHamburger />
      </Flex>
    </>
  );
};

export default Navbar;
