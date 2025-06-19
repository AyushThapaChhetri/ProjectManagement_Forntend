import { InputWithKbd } from "@/components/ui/searchBar";
import { Flex, Heading, HStack } from "@chakra-ui/react";
import { UserTable } from "./userTable";
import AddUser from "./AddUser";
import { useState } from "react";

const User = () => {
  const [searchInput, setSearchInput] = useState("");
  console.log(searchInput);
  const [messageAlert, setMessageAlert] = useState<{
    message: string;
    status: "error" | "warning" | "info" | "success";
  } | null>(null);

  //<-version control for force refreshing of the table when addition of new user
  const [version, setVersion] = useState(0);

  //AddUser component calls it
  const handleUserAdded = () => {
    setVersion((v) => v + 1);
  };

  return (
    <>
      <Flex
        p="2rem"
        direction="column"
        // border="5px solid black"
        h="calc(100vh - 4rem)"
        // bg="blue"
        gapY={3}
        overflowY={{ base: "auto", tablet: "hidden" }}
        // h="100%"
      >
        <HStack
          gapX="10"
          // justify="space-between"
        >
          <Heading size="3xl"> Users</Heading>
          {/* <Button bg={"purple"} size="xs" onClick={handleAddUsers}>
            Add Users
          </Button> */}
          <AddUser mode="create" handleUserAdded={handleUserAdded} />
        </HStack>
        <Flex
          // border="10px solid red"
          flexGrow={1}
          gapY={3}
          direction="column"
          h="100%"
          minH={0}
        >
          <InputWithKbd
            width="250px"
            placeholder={"Search user"}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Flex
            direction={"column"}
            // border="5px solid black"
            flexGrow="1"
            // this prevents more datas inside table
            minH={0} // Ensures it doesn’t overflow the parent
            // maxH="95%"
            w="100%" // Full width for the table
            // bg="green"
            // h="fit-content"
            // h="500px"
          >
            <UserTable
              searchInput={searchInput}
              messageAlert={messageAlert}
              setMessageAlert={setMessageAlert}
              version={version}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default User;
