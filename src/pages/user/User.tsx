import { InputWithKbd } from "@/components/ui/searchBar";
import { Button, Flex, Heading, HStack } from "@chakra-ui/react";
import { UserTable } from "./userTable";

const User = () => {
  return (
    <>
      <Flex
        p="2rem"
        direction="column"
        // border="5px solid black"
        h="calc(100vh - 4rem)"
        gapY={3}
        // h="100%"
      >
        <HStack
          gapX="10"
          // justify="space-between"
        >
          <Heading size="3xl"> Users</Heading>
          <Button bg={"purple"} size="xs">
            Add Users
          </Button>
        </HStack>
        <Flex
          // border="10px solid red"
          flexGrow={1}
          gapY={3}
          direction="column"
          h="100%"
          minH={0}
        >
          <InputWithKbd width="250px" />
          <Flex
            // border="5px solid black"
            flexGrow="1"
            minH={0}
          >
            <UserTable />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default User;
