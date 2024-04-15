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
  useToast,
} from "@chakra-ui/react";

import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Axios } from "../services/axios";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toast = useToast();

  const submitHandler = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });

      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password do not match",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });

      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await Axios.post(
        "/api/auth/register",
        {
          name,
          email,
          password,
        },
        config
      );

      toast({
        title: "Account created",
        description: "We've created your account for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (err) {
      type errType = { response: { data: { message: string } } };

      toast({
        title: "Something went wrong!",
        description: (err as errType).response?.data?.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack>
      <FormControl isRequired display={"flex"} flexDirection={"column"} gap={4}>
        <Box>
          <FormLabel fontSize={"14px"}>Name</FormLabel>
          <Input
            id="name"
            placeholder="Your name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Box>

        <Box>
          <FormLabel fontSize={"14px"}>Email</FormLabel>
          <Input
            id="email"
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
              id="password"
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
              id="confirm-password"
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
          onClick={submitHandler}
          _hover={{ bgColor: "gray.200", color: "black" }}
        >
          Create account
        </Button>
      </FormControl>
    </VStack>
  );
};

export default RegisterForm;
