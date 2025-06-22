import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import hill from "@/assets/hill.webp";
import ContactCard from "./ContactCard";
import { FaLocationDot } from "react-icons/fa6";

import { FaPhoneAlt } from "react-icons/fa";

import { MdEmail } from "react-icons/md";

const ContactUs = () => {
  return (
    <>
      <Flex direction={"column"} overflowY={"auto"}>
        <Image
          src={hill}
          fit="cover"
          alt="citywideFigure"
          // w={{ base: "300px", desktop: "400px" }}
          //   h={{ base: "200px", desktop: "400px", wide: "550px" }}
          h={{ base: "500px" }}
          minH={"500px"}
        />
        <Flex
          py={"4em"}
          px={{ base: "5%", tablet: "20%" }}
          justifyContent={"center"}
          align={"center"}
        >
          <Flex direction={"column"}>
            <Heading
              mb={"20px"}
              textAlign={"center"}
              textStyle={{ base: "2xl", laptopSm: "4xl" }}
            >
              Reach Us
            </Heading>
            <Text textStyle="lg" textAlign={"center"}>
              We’d love to hear from you! Whether you have a question, feedback,
              or just want to say hello, feel free to get in touch. Our team is
              always ready to assist you and ensure you have the best experience
              using our project management tool. Drop us a message and we’ll get
              back to you as soon as possible.
            </Text>

            <Flex
              gap={{ base: 10, tablet: 20 }}
              mt={{ base: "50px", tablet: "100px" }}
              wrap={{ base: "wrap", tabletLg: "nowrap" }}
              justify={"space-between"}
            >
              <ContactCard
                icon={<FaLocationDot />}
                cardHeading={"Adress"}
                cardBody={"Chandragiri, Kathmandu"}
              ></ContactCard>
              <ContactCard
                icon={<FaPhoneAlt />}
                cardHeading={"Call Us"}
                cardBody={"(+977) 9863174428"}
              ></ContactCard>
              <ContactCard
                icon={<MdEmail />}
                cardHeading={"Email Us"}
                cardBody={"contact@gmail.com"}
              ></ContactCard>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default ContactUs;
