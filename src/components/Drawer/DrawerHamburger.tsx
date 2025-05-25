import {
  Box,
  Button,
  CloseButton,
  Drawer,
  Flex,
  Icon,
  Link,
  Portal,
  Text,
} from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";

interface DrawerHamburgerProps {
  tokenAvailable: boolean;
  handleLogout: () => Promise<void>;
}

const DrawerHamburger = ({
  tokenAvailable,
  handleLogout,
}: DrawerHamburgerProps) => {
  // console.log("token", tokenAvailable);
  return (
    <Drawer.Root size="xs">
      <Drawer.Trigger asChild>
        {/* <Button variant="outline" size="sm">
          Open Drawer
        </Button> */}
        <Icon size="lg" display={{ base: "block", tabletLg: "none" }}>
          <RxHamburgerMenu />
        </Icon>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Focus Track</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <Flex direction={"column"} gap={6}>
                <Box cursor="pointer">
                  <Text
                    display="inline"
                    borderBottom="2px solid transparent"
                    transition="all 0.2s"
                    _hover={{
                      borderBottom: "2px solid purple",
                    }}
                  >
                    <Link href="/board">Boards</Link>
                    {/* Product */}
                  </Text>
                </Box>
                <Box cursor="pointer">
                  <Text
                    display="inline"
                    borderBottom="2px solid transparent"
                    transition="all 0.2s"
                    _hover={{
                      borderBottom: "2px solid purple",
                    }}
                  >
                    About Us
                  </Text>
                </Box>
                <Box cursor="pointer">
                  <Text
                    display="inline"
                    borderBottom="2px solid transparent"
                    transition="all 0.2s"
                    _hover={{
                      borderBottom: "2px solid purple",
                    }}
                  >
                    Contact
                  </Text>
                </Box>
              </Flex>
            </Drawer.Body>
            <Drawer.Footer>
              {!tokenAvailable && (
                <>
                  <Button variant="outline" asChild>
                    <a href="signup"> Sign Up</a>
                  </Button>
                  <Button asChild>
                    <a href="login"> Login</a>
                  </Button>
                </>
              )}
              {tokenAvailable && <Button onClick={handleLogout}>Logout</Button>}
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default DrawerHamburger;
