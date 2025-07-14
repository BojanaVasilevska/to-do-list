import { Flex, Spinner, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import TodoItem from "./TodoItem";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../App";

export type Todo = {
    _id: number;
    body: string;
    completed: boolean;
}

const TodoList = () => {
    const { data: todos, isLoading } = useQuery<Todo[]>({
        queryKey: ["todos"],
        queryFn: async () => {
            try {
                const res = await fetch(BASE_URL + "/todos"); 
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }

                return data || [];

            } catch (error) {
                console.error("Error fetching todos:", error); 
                throw error; 
            }
        }
    });

    const headingGradient = useColorModeValue(
        'linear(to-r, #2e77bbff, #805AD5)', 
        'linear(to-r, #2e77bbff, #13df50ff)'
    );

    const bearImageFilter = useColorModeValue("none", "invert(100%) hue-rotate(180deg)");


    return (
        <>
            <Text
                fontSize={{ base: "3xl", md: "4xl" }}
                textTransform={"uppercase"}
                fontWeight={"extrabold"}
                textAlign={"center"}
                my={6}
                bgGradient={headingGradient}
                bgClip='text'
                fontFamily="'Montserrat', sans-serif"
                letterSpacing="wide"
            >
                To-Do List
            </Text>
            {isLoading && (
                <Flex justifyContent={"center"} my={8}>
                    <Spinner size={"xl"} thickness="4px" speed="0.65s" color="blue.500" />
                </Flex>
            )}
            {!isLoading && todos?.length === 0 && (
                <Stack alignItems={"center"} gap='3' py={10}>
                    <Text fontSize={"2xl"} textAlign={"center"} color={"gray.400"} fontWeight="medium">
                        All tasks completed! ✨ Time for a break!
                    </Text>
                    <img
                        src='/bear.png'
                        alt='Happy Bear'
                        width={180}
                        height={180}
                        style={{ filter: bearImageFilter }}
                    />
                </Stack>
            )}
            <Stack gap={4}>
                {todos?.map((todo) => (
                    <TodoItem key={todo._id} todo={todo} />
                ))}
            </Stack>
        </>
    );
};
export default TodoList;
