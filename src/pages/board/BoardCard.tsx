import { Flex, Text } from "@chakra-ui/react";

interface BoardCardProps {
  Boardheading: string;
  backgroundColor: string;
}
const BoardCard = ({ Boardheading, backgroundColor }: BoardCardProps) => {
  return (
    <>
      <Flex
        w={{ base: "100%", desktop: "350px" }}
        // border={"1px solid gray"}
        bg={backgroundColor}
        color={"white"}
        fontWeight={"bold"}
        p={"2rem"}
        shadow={"md"}
        rounded={"md"}
      >
        <Text textStyle={{ base: "md", tablet: "lg" }} textAlign={"justify"}>
          {Boardheading}
        </Text>
      </Flex>
    </>
  );
};

export default BoardCard;
