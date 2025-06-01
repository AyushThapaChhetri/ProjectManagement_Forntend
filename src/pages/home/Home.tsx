import Navbar from "@/components/Navbar";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";

import avatar1 from "@/assets/avatar1.jpg";
import { IoPlayCircleOutline } from "react-icons/io5";
import PictureZigZag from "./PictureZigZag";
import { SiSamsung } from "react-icons/si";
import { FaSpotify } from "react-icons/fa";
import { FaAmazon } from "react-icons/fa";
import { FaMicrosoft } from "react-icons/fa";
import { FaApple } from "react-icons/fa";

const Home = () => {
  // console.log("API URL →", import.meta.env.VITE_API_URL);
  return (
    <>
      <Flex justify="center">
        <Flex
          direction="column"
          // border="2px solid black"
          width="100vw"
          height={{ base: "auto", mobileSm: "100vh" }}
          maxWidth="2560px"
          overflow="auto"
          gap={{
            base: "5",
            mobile: "12",
            tablet: "10",
            wide: "4",
            ultraHd: "10",
          }}
        >
          <Navbar />
          <Flex
            // borderWidth="2px"
            flexGrow="1"
            justify={{ wide: "space-between" }}
            align="center"
            px={{ base: "6", wide: "20" }}
            // h="550px"
            // border="2px solid green"
            // height="80vh"
            maxH="1000px"
            gap={{ base: "5" }}
            direction={{ base: "column", wide: "row" }}
            // pt={{ base: "0", wide: "20px", ultraHd: "30px" }}
          >
            <Flex
              direction="column"
              width={{ base: "100%", wide: "50%" }}
              gap={{ base: "5", tabletSm: "8", wide: "5", ultraHd: "10" }}
              // justify={{ base: "center", tabletSm: "flex-start" }}
              align={{ base: "flex-start" }}
              // borderWidth="2px"
              py={0}
            >
              <Box height="auto">
                <Heading
                  size={{
                    base: "2xl",
                    mobileLg: "4xl",
                    tablet: "6xl",
                    ultraHd: "7xl",
                  }}
                  fontFamily="sans-serif"
                  // pr="20%"
                  pr={{ wide: "10%", ultraHd: "15%" }}
                >
                  Work more Structured and Organized.
                </Heading>
              </Box>
              <Text
                as="p"
                color="gray"
                fontFamily="sans-serif"
                textStyle={{
                  base: "sm",
                  mobileLg: "lg",
                  tablet: "xl",
                }}
                // pr="15%"
                pr={{ wide: "2%" }}
              >
                Simplify your daily routine by organizing tasks, setting
                priorities, and managing deadlines with Focus Track. Whether
                you're working solo or with a team, Focus Track keeps your
                projects on track and your goals within reach. <br />
                <br /> Its powerful features and user-friendly design help you
                stay focused, productive, and in control every step of the way.
              </Text>
              <Flex>
                <ButtonGroup
                  size={{ base: "xs", mobile: "lg", wide: "xl" }}
                  gap={5}
                >
                  <Button
                    bg="#bd53e6"
                    px={{ base: ".5rem", mobile: "1rem", wide: "4rem" }}
                    _hover={{ bg: "purple.400" }}
                    asChild
                  >
                    <a href="login">Get Started</a>
                  </Button>
                  <Button
                    px={{ base: ".5rem", wide: "4rem" }}
                    // border="2px solid purple"
                    variant="outline"
                    alignItems="center"
                    _hover={{ bg: "purple.400", color: "white" }}
                  >
                    Watch Demo
                    <Icon>
                      <IoPlayCircleOutline />
                    </Icon>
                  </Button>
                </ButtonGroup>
              </Flex>

              <Flex gap={5} align="center">
                <Avatar.Root
                  // size={{ base: "sm", tablet: "xl", ultraHd: "2xl" }}
                  w="auto"
                  h="3.5rem"
                >
                  <Avatar.Fallback name="Ayush Thapa" />
                  <Avatar.Image src={avatar1} />
                </Avatar.Root>
                <Text
                  as="p"
                  color="gray"
                  fontFamily="italic"
                  textStyle={{ tablet: "xl", ultraHd: "2xl" }}
                >
                  "Simplify your workflow with Focus Track — no fuss, just
                  focus."
                </Text>
              </Flex>
            </Flex>

            <Flex
              width={{ base: "100%", wide: "50%" }}
              justify={{ base: "center", wide: "flex-end" }}
              // h="auto"
              // border="2px solid black"
              // h="2000px"
            >
              <Flex boxSizing="border-box" gap={2} h="auto">
                <PictureZigZag />
              </Flex>
            </Flex>
          </Flex>
          <Flex
            flexGrow="1"
            flexShrink="0"
            px={{ base: "6", wide: "20" }}
            as="footer"
            // h="20vh"
            h={{ base: "100px", wide: "11vh" }}
            justify={{ base: "center", wide: "space-between" }}
            align="center"
            gap={{ base: "5", wide: "0" }}
            boxSizing="border-box"
            // border="2px solid orange"
            direction={{ base: "column-reverse", wide: "row" }}
            bg="gray.100"
          >
            <Text
              as="p"
              color="gray"
              fontFamily="sans-serif"
              // textStyle="md"
              textStyle={{ base: "xs", wide: "md" }}
              // border="2px solid red"
              // pr="15%"
              // pr={{ wide: "15%" }}
            >
              Trusted by 10,000+ Great Companies Worldwide.
            </Text>
            <Flex
              gap={{ base: "10", wide: "20" }}
              // pr="5rem"
              // alignItems="flex-end"
              justify={{ base: "center", wide: "flex-end" }}
              // flexWrap="wrap"
              // bg="red"
              w="60%"
              // border="2px solid red"
            >
              <Icon
                size={{ base: "xs", tabletSm: "sm", wide: "2xl" }}
                color="gray"
              >
                <FaApple />
              </Icon>
              <Icon
                size={{ base: "xs", tabletSm: "sm", wide: "2xl" }}
                color="gray"
              >
                <SiSamsung />
              </Icon>
              <Icon
                size={{ base: "xs", tabletSm: "sm", wide: "2xl" }}
                color="gray"
              >
                <FaSpotify />
              </Icon>
              <Icon
                size={{ base: "xs", tabletSm: "sm", wide: "2xl" }}
                color="gray"
              >
                <FaAmazon />
              </Icon>
              <Icon
                size={{ base: "xs", tabletSm: "sm", wide: "2xl" }}
                color="gray"
              >
                <FaMicrosoft />
              </Icon>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
