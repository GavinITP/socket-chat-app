import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Button,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";

import { IoMdEyeOff, IoMdEye } from "react-icons/io";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  return (
    <VStack spacing={4}>
      <FormControl isRequired display={"flex"} flexDirection={"column"} gap={6}>
        <Box>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Box>

        <Box>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              pr={10}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <InputRightElement width="4.5rem">
              <Icon
                boxSize={6}
                as={showPassword ? IoMdEyeOff : IoMdEye}
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
              />
            </InputRightElement>
          </InputGroup>
        </Box>

        <Button
          my={8}
          bgColor={"black"}
          color={"white"}
          borderRadius={"full"}
          _hover={{ bgColor: "gray.200", color: "black" }}
        >
          Submit
        </Button>
      </FormControl>
    </VStack>
  );
};

export default LoginForm;
