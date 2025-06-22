import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import AboutUs_Board from "@/assets/aboutUsImage.jpg";
import AboutCard from "./AboutCard";

const AboutUs = () => {
  return (
    <>
      <Flex
        direction={"column"}
        // bg={"red"}
        h={"100%"}
        w={"100%"}
        minW={"300px"}
        // border={"2px solid black"}
        pt={10}
        overflowY={"auto"}
      >
        <Flex
          // h={{ base: "500px" }}
          direction={{ base: "column-reverse", desktop: "row" }}
          mb={{ base: "50px", desktop: "0" }}
          gap={20}
          alignItems={{ base: "center" }}
          // border={"2px solid black"}
          px={{ base: "5%", tablet: "10%" }}
        >
          {/* <Flex w={{ base: "100%", desktop: "90%" }}> */}
          <Image
            rounded="md"
            src={AboutUs_Board}
            alt="AboutUs_Board"
            w={{ base: "300px", desktop: "400px" }}
            minW={"300px"}
            // h={{ base: "200px", desktop: "400px", wide: "550px" }}
            // position={"absolute"}
            // bottom={-20}
          />
          {/* </Flex> */}
          <Flex
            direction={"column"}
            gap={{ base: "20px", wide: "40px" }}
            justifyContent={"center"}
          >
            <Heading
              // mt={20}
              size="5xl"
            >
              About Us
            </Heading>
            <Text textStyle="lg" textAlign={"justify"}>
              Welcome to our Project Management platform a modern, Kanban-based
              tool inspired by the simplicity and flexibility of Trello. Our
              goal is to help individuals and teams stay organized, collaborate
              efficiently, and manage tasks with ease. Whether you're tracking
              personal to-dos or managing a team project, our platform provides
              an intuitive drag-and-drop interface, customizable boards, and
              real-time updates to boost productivity. <br />
              <br />
              We’re passionate about creating a clean, user-friendly experience
              that empowers you to get things done, one task at a time.
            </Text>
          </Flex>
        </Flex>
        <Flex
          // h={{ base: "500px" }}
          direction={"column"}
          py={20}
          bg={"pink.200"}
          // border={"2px solid black"}
          justify={"center"}
          px={{ base: "5%", tablet: "10%" }}
        >
          <Heading
            mb={"20px"}
            textAlign={"center"}
            textStyle={{ base: "2xl", laptopSm: "4xl" }}
          >
            OUR VALUES
          </Heading>
          <Flex
            gap={10}
            wrap={{ base: "wrap", desktop: "nowrap" }}
            // border={"2px solid black"}
          >
            <AboutCard
              cardNumber={1}
              cardHeading={"Our Mission"}
              cardBody={
                "Our mission is to simplify project management for everyone  from individuals to growing teams. We aim to provide a flexible, clean, and intuitive workspace that empowers users to stay organized, prioritize tasks, and boost productivity using the Kanban methodology."
              }
            />
            <AboutCard
              cardNumber={2}
              cardHeading={"What We Offer"}
              cardBody={
                "We offer a drag-and-drop Kanban interface, customizable boards, real-time updates, and an efficient way to manage tasks and deadlines. Whether you're handling a personal project or collaborating with a team, our tool adapts to your workflow."
              }
            />
            <AboutCard
              cardNumber={3}
              cardHeading={"Why Choose Us"}
              cardBody={
                "Unlike complex enterprise tools, we focus on simplicity, speed, and user experience. Our platform is built to help you get started instantly without unnecessary clutter  making project management efficient, stress-free, and enjoyable."
              }
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default AboutUs;
