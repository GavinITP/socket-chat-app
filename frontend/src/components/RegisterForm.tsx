import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";

import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <VStack>
      <FormControl isRequired display={"flex"} flexDirection={"column"} gap={4}>
        <Box>
          <FormLabel fontSize={"14px"}>Name</FormLabel>
          <Input
            placeholder="Your name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Box>

        <Box>
          <FormLabel fontSize={"14px"}>Email</FormLabel>
          <Input
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Box>

        <Box>
          <FormLabel fontSize={"14px"}>Password</FormLabel>
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
                boxSize={5}
                as={showPassword ? IoMdEyeOff : IoMdEye}
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
              />
            </InputRightElement>
          </InputGroup>
        </Box>

        <Box>
          <FormLabel fontSize={"14px"}>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              pr={10}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <InputRightElement width="4.5rem">
              <Icon
                boxSize={5}
                as={showConfirmPassword ? IoMdEyeOff : IoMdEye}
                onClick={() => {
                  setShowConfirmPassword((prev) => !prev);
                }}
              />
            </InputRightElement>
          </InputGroup>
        </Box>

        <Button
          mt={6}
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

export default RegisterForm;
