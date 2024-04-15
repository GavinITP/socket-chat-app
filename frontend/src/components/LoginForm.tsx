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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { Axios } from "../services/axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();

  const submitHandler = async () => {
    if (!email || !password) {
      toast({
        title: "Please fill all the fields",
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
        "/api/auth/login",
        {
          email,
          password,
        },
        config
      );

      toast({
        title: "Login success",
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
    <VStack spacing={4}>
      <FormControl isRequired display={"flex"} flexDirection={"column"} gap={4}>
        <Box>
          <FormLabel fontSize={"14px"}>Email</FormLabel>
          <Input
            id="login-email"
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
              id="login-password"
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
          mt={8}
          bgColor={"black"}
          color={"white"}
          borderRadius={"full"}
          _hover={{ bgColor: "gray.200", color: "black" }}
          onClick={submitHandler}
        >
          Log in
        </Button>
      </FormControl>
    </VStack>
  );
};

export default LoginForm;
