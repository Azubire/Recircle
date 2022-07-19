import React from "react";
import { HomeStackScreenProps } from "../navigations/AppStack/types";
import {
  Box,
  Button,
  Center,
  HStack,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from "native-base";

const Home: React.FC<HomeStackScreenProps<"Dashboard">> = ({ navigation }) => {
  const { toggleColorMode } = useColorMode();
  return (
    <HStack
      bg={useColorModeValue("success.500", "warning.500")}
      flex={1}
      justifyContent="center"
      alignItems={"center"}
      p={1}
    >
      <Center>
        <Text>Home Screen</Text>
        <Button
          onPress={() => {
            navigation.navigate("Details");
          }}
          size="sm"
          mb="2"
          colorScheme={"warning"}
        >
          Click Me
        </Button>
      </Center>
    </HStack>
  );
};

export default Home;
