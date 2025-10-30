import React from "react";
import { Container, Box, Text, Tabs } from "@chakra-ui/react";
import Login from "@/components/Authentication/Login";
import Signup from "@/components/Authentication/Signup";
// import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu"

const Homepage = () => {
  return (
    <Container maxW="md" >
      <Box
        p={3}
        width="100%"
        bg="#004b70"
        borderRadius="2xl"
        borderWidth="2px"
        m="40px 0 15px 0"
      >
        <Text
          textAlign="center"
          fontFamily="Work sans"
          fontSize="3xl"
          color="white"
          fontWeight="bolder"
        >
          AUTH-HUB
        </Text>
      </Box>

      <Box p={3} width="100%" bg="#004b70" borderRadius="2xl" borderWidth="2px">
        <Tabs.Root
          key="subtle"
          defaultValue="login"
          variant="subtle"
          colorPalette="pink"
          fitted
        >
          <Tabs.List>
            <Tabs.Trigger value="login">
              {/* <LuUser /> */}
              <Text color="white" fontWeight="bold" textDecoration="underline">
                Login
              </Text>
            </Tabs.Trigger>
            <Tabs.Trigger value="sign-up">
              {/* <LuFolder /> */}
              <Text color="white" fontWeight="bold" textDecoration="underline">
                Sign-up
              </Text>
            </Tabs.Trigger>

            <Tabs.Indicator rounded="l2" />
          </Tabs.List>
          <Tabs.Content value="login">
            <Login />
          </Tabs.Content>
          <Tabs.Content value="sign-up">
            <Signup />
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Container>
  );
};

export default Homepage;
// m={0} → removes margin-left:auto and margin-right:auto from Container.
