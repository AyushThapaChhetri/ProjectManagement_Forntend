// import React from 'react'
// import { RxHamburgerMenu } from "react-icons/rx";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import DrawerHamburger from "./Drawer/DrawerHamburger";
import { useEffect, useState } from "react";
import api from "@/api/Api";
import { useNavigate } from "react-router";

// import { Icon } from "@chakra-ui/react";

const Navbar = () => {
  const [tokenAvailable, setTokenAvailable] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken && refreshToken.trim() !== "") {
      setTokenAvailable(true);
    }
  }, []);

  const handleLogout = async () => {
    // console.log("Logout");
    // localStorage.removeItem("authToken");
    // localStorage.removeItem("refreshToken");
    try {
      console.log("Logout before Refresh token");

      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        console.log("Logout after check Refresh token");

        // Send request to server to delete the refresh token
        await api.post(
          "/auth/logout",
          { refreshToken: refreshToken }
          // {
          //     headers: {
          //         'Content-Type': 'application/json'
          //     }
          // }
        );
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      // Always clear localStorage, even if the server request fails
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      console.log("Logout complete");
      // Optionally redirect the user or update the UI
    }
  };

  return (
    <>
      <Flex
        as="nav"
        justify="space-between"
        align="center"
        px={{ base: "6", wide: "20" }}
        py={3}
        h={{ base: "5rem", wide: "4rem" }}
        borderWidth="1px"
        width="100%"
        // overflow="auto"
      >
        {/* Logo or Company Name */}
        <Box fontWeight="bold" fontSize={{ base: "md", tabletLg: "lg" }}>
          <Link href="/">FocusTrack</Link>
          {/* FocusTrack */}
        </Box>

        {/* Nav Links */}
        <Flex
          gap={6}
          align="center"
          display={{ base: "none", tabletLg: "flex" }}
        >
          <Box cursor="pointer">
            <Link href="/body">Workspace</Link>
          </Box>
          <Box cursor="pointer">About Us</Box>
          <Box cursor="pointer">Contact</Box>
        </Flex>

        {/* Auth Buttons */}
        <Flex gap={3} display={{ base: "none", tabletLg: "flex" }}>
          {!tokenAvailable && (
            <>
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
                <a href="/login">Log In</a>
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
                <a href="/signUp">Sign Up</a>
              </Button>
            </>
          )}
          {tokenAvailable && (
            <Button
              bg="#bd53e6"
              color="white"
              borderRadius="2xl"
              fontSize="sm"
              h="30px"
              _hover={{ bg: "purple.400" }}
              onClick={handleLogout}
            >
              Log Out
            </Button>
          )}
        </Flex>

        {/* <Icon size="lg" display={{ base: "block", md: "none" }}>
          <RxHamburgerMenu />
        </Icon> */}
        <DrawerHamburger
          tokenAvailable={tokenAvailable}
          handleLogout={handleLogout}
        />
      </Flex>
    </>
  );
};

export default Navbar;
