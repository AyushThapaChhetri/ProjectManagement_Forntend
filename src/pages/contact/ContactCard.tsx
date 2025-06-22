import { Flex, Icon, Text } from "@chakra-ui/react";

interface CardProps {
  icon: React.ReactNode;
  cardHeading: string;
  cardBody: string;
}
const ContactCard = ({ icon, cardHeading, cardBody }: CardProps) => {
  return (
    <>
      <Flex
        // h={200}
        bg={"gray.100"}
        w={{ base: "100%", tabletLg: "250px" }}
        minW={"250px"}
        py={"4rem"}
        // border={"2px solid black"}
        direction={"column"}
        shadow={"lg"}
        gapY={5}
        rounded={"md"}
        align={"center"}
      >
        <Icon
          size={{
            base: "lg",
          }}
        >
          {icon}
        </Icon>
        <Text
          textStyle="2xl"
          fontWeight="medium"
          // textAlign={"center"}
        >
          {cardHeading}
        </Text>
        <Text
          textStyle="md"
          //   textAlign={"center"}
          // css={{ hyphens: "auto" }}
        >
          {cardBody}
        </Text>
      </Flex>
    </>
  );
};

export default ContactCard;
