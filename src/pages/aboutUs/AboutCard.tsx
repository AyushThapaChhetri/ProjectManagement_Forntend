import { Flex, Text } from "@chakra-ui/react";

interface CardProps {
  cardNumber: number;
  cardHeading: string;
  cardBody: string;
}
const AboutCard = ({ cardNumber, cardHeading, cardBody }: CardProps) => {
  return (
    <>
      <Flex
        // h={200}
        bg={"gray.100"}
        minW={"200px"}
        // w={300}
        p={10}
        // border={"2px solid black"}
        direction={"column"}
        shadow={"lg"}
        gapY={5}
        rounded={"md"}
      >
        <Text textStyle="3xl" fontWeight="bold" textAlign={"center"}>
          {cardNumber}
        </Text>
        <Text textStyle="2xl" fontWeight="medium" textAlign={"center"}>
          {cardHeading}
        </Text>
        <Text
          textStyle="md"
          textAlign={"center"}
          // css={{ hyphens: "auto" }}
        >
          {cardBody}
        </Text>
      </Flex>
    </>
  );
};

export default AboutCard;
