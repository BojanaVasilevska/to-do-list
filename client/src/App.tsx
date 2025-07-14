import { Container, Stack, Box, useColorModeValue } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

export const BASE_URL = "http://localhost:8080/api";

function App() {
  const bgColor = useColorModeValue("linear(to-br, #ADD8E6, #90EE90)", "linear(to-br, #2D3748, #1A202C)");

  return (
    <Box
      h='100vh'
      w='100vw'
      bgGradient={bgColor}
      overflowY="auto"
    >
      <Stack h='100%' spacing={6}>
        <Navbar />
        <Container maxW="container.md" flex={1} display="flex" flexDirection="column" py={6}>
          <TodoForm />
          <Box flex={1} mt={6}> 
             <TodoList />
          </Box>
        </Container>
      </Stack>
    </Box>
  );
}

export default App;
