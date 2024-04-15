import {
  Center,
  Container,
  Flex,
  Heading,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

import { MdMarkUnreadChatAlt } from "react-icons/md";

const Home = () => {
  return (
    <Container maxW="xl" centerContent>
      <Flex my={10} gap={4} flexDirection={"column"}>
        <Icon as={MdMarkUnreadChatAlt} boxSize={14} mx={"auto"} />

        <Heading fontSize="5xl" fontWeight={700}>
          Socket Chat
        </Heading>

        <Text color={"gray"} fontSize={"md"} textAlign={"center"}>
          Welcome to socket.io chat application
        </Text>
      </Flex>

      <Center w={"600px"} py={8} px={6} shadow={"xl"} mb={12}>
        <Tabs variant="soft-rounded" w="100%">
          <TabList
            bgColor={"gray.100"}
            rounded={"full"}
            p={1}
            maxW={"fit-content"}
            mx="auto"
          >
            <Tab _selected={{ color: "white", bg: "black" }} w={"120px"}>
              Log in
            </Tab>
            <Tab _selected={{ color: "white", bg: "black" }} w={"120px"}>
              Register
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <LoginForm />
            </TabPanel>
            <TabPanel>
              <RegisterForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Center>
    </Container>
  );
};

export default Home;
