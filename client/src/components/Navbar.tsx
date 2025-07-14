import {
  Box,
  Flex,
  IconButton,
  useColorModeValue,
  useColorMode,
  Text,
  Container,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      position="sticky"
      top={0}
      zIndex={10}
      bg={useColorModeValue("rgba(255, 255, 255, 0.2)", "rgba(26, 32, 44, 0.5)")}
      backdropFilter="blur(15px) saturate(180%)"
      borderBottom="1px solid"
      borderColor={useColorModeValue("rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.1)")}
      shadow="lg"
      py={3}
    >
      <Container maxW="container.lg">
        <Flex alignItems="center" justifyContent="space-between">
          <HStack spacing={3} alignItems="center">
            <Box boxSize="30px">
              <img src="/todo.png" alt="logo" width={30} height={30} />
            </Box>
            <Text
              fontSize={{ base: "xl", md: "2xl" }} 
              fontWeight="extrabold"
              bgGradient="linear(to-r, #286ecaff, #19c54dff)" 
              bgClip="text"
              fontFamily="'Poppins', sans-serif"
              letterSpacing="tight"
            >
              To-Do
            </Text>
          </HStack>

          <Tooltip label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`} hasArrow>
            <IconButton
              onClick={toggleColorMode}
              aria-label="Toggle Color Mode"
              icon={colorMode === "light" ? <IoMoon size={22} /> : <LuSun size={22} />}
              variant="ghost"
              color={useColorModeValue("gray.700", "gray.200")} 
              _hover={{
                bg: useColorModeValue("rgba(0,0,0,0.08)", "rgba(255,255,255,0.08)"), 
                transform: "scale(1.05)", 
              }}
              _active={{
                transform: "scale(0.95)", 
              }}
              borderRadius="full"
              size="lg"
            />
          </Tooltip>
        </Flex>
      </Container>
    </Box>
  );
}
