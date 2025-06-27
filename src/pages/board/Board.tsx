import { Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { TbLetterF } from "react-icons/tb";
import { LuLayoutTemplate } from "react-icons/lu";
import BoardCard from "./BoardCard";

const Board = () => {
  return (
    <>
      <Flex px={"15%"} py={"50px"} direction={"column"} overflowY={"auto"}>
        <Flex
          gap={5}
          pb={"20px"}
          borderBottom={"2px solid grey"}
          w={"100%"}
          pl={{ base: "10px", tablet: "100px" }}
        >
          <Flex
            border={"2px solid black"}
            height={"50px"}
            width={"50px"}
            justify={"center"}
            align={"center"}
            rounded={"md"}
          >
            <Icon size="2xl">
              <TbLetterF />
            </Icon>
          </Flex>
          <Text textStyle="2xl" textAlign={"justify"}>
            Focus Workspace
          </Text>
        </Flex>

        <Flex py={10} direction={"column"} gap={3}>
          <Text textStyle="2xl" textAlign={"justify"}>
            Boards
          </Text>
          <HStack>
            <LuLayoutTemplate />
            <Text textStyle="lg" textAlign={"justify"}>
              Most popular templates
            </Text>
          </HStack>
          <Text textStyle="lg" textAlign={"justify"}>
            To help you get started faster, we offer a variety of ready-to-use
            templates designed for different needs. Whether you're managing a
            software project, planning personal goals, organizing team tasks, or
            tracking a content calendar our most popular templates give you a
            solid foundation. Simply choose a template, customize it to fit your
            workflow, and you're ready to go. Save time and stay focused with
            layouts that work out of the box.
          </Text>
          <Flex justify={"space-between"} gap={10} wrap={"wrap"} mt={"50px"}>
            <BoardCard Boardheading={"Basic Board"} backgroundColor={"blue"} />
            <BoardCard Boardheading={"Kanban Board"} backgroundColor={"pink"} />
            <BoardCard
              Boardheading={"Daily Task Management"}
              backgroundColor={"orange"}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Board;
