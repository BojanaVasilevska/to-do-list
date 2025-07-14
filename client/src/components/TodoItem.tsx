import { Badge, Flex, IconButton, Spinner, Text, useColorModeValue } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoCheckmarkCircleSharp } from "react-icons/io5"; 
import { LuTimer } from "react-icons/lu";

import { Todo } from "./TodoList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../App";

const TodoItem = ({ todo }: { todo: Todo }) => {
    const queryClient = useQueryClient();

    const itemBg = useColorModeValue("whiteAlpha.900", "rgba(255, 255, 255, 0.08)");
    const itemBorderColor = useColorModeValue("gray.200", "gray.700");
    const itemShadow = useColorModeValue("md", "dark-lg");
    const completedTextColor = useColorModeValue("green.600", "green.300");
    const incompleteTextColor = useColorModeValue("gray.800", "gray.100");


    const { mutate: updateTodo, isPending: isUpdating } = useMutation({
        mutationKey: ["updateTodo"],
        mutationFn: async () => {
            if (todo.completed) {
                alert("Todo is already completed!");
                return;
            }
            try {
                const res = await fetch(BASE_URL + `/todos/${todo._id}`, {
                    method: "PATCH",
                });

                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }
                return data;
            } catch (error) {
                console.error("Error updating todo:", error);
                alert("Failed to update todo.");
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        }
    });

    const { mutate: deleteTodo, isPending: isDeleting } = useMutation({
        mutationKey: ["deleteTodo"],
        mutationFn: async () => {
            try {
                const res = await fetch(BASE_URL + `/todos/${todo._id}`, {
                    method: "DELETE",
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }
                return data;
            } catch (error) {
                console.error("Error deleting todo:", error);
                alert("Failed to delete todo.");
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        }
    });

    return (
        <Flex
            gap={3}
            alignItems={"center"}
            bg={itemBg}
            border="1px solid"
            borderColor={itemBorderColor}
            p={4}
            borderRadius={"xl"}
            shadow={itemShadow}
            transition="all 0.2s ease-in-out"
            _hover={{
                transform: "translateY(-3px)",
                shadow: useColorModeValue("lg", "xl"),
            }}
        >
            <Flex
                flex={1}
                alignItems={"center"}
                justifyContent={"space-between"}
            >
                <Text
                    fontSize={{ base: "md", md: "lg" }}
                    color={todo.completed ? completedTextColor : incompleteTextColor}
                    textDecoration={todo.completed ? "line-through" : "none"}
                    fontWeight={todo.completed ? "normal" : "medium"}
                    flex={1}
                    mr={2}
                    wordBreak="break-word"
                >
                    {todo.body}
                </Text>

                {/* --- START OF IMPROVED BADGES --- */}
                {todo.completed ? (
                    <Badge
                        variant="solid"
                        bgGradient="linear(to-r, green.400, teal.400)"
                        color="white"
                        px={3}
                        py={1.5} // More vertical padding
                        borderRadius="full" // Fully rounded badge
                        display="flex" // Enable flexbox for icon and text alignment
                        alignItems="center"
                        gap={1} // Space between icon and text
                        minWidth="fit-content" // Ensure badge doesn't shrink too much
                        shadow="md" // Subtle shadow for depth
                    >
                        <IoCheckmarkCircleSharp size={14} /> {/* Icon for Done */}
                        <Text fontSize="xs" fontWeight="bold" lineHeight="normal" mt={1}>Done</Text> {/* Smaller, bolder text */}
                    </Badge>
                ) : (
                    <Badge
                        variant="solid" // Keeping solid variant for consistent gradient
                        bgGradient="linear(to-r, orange.400, yellow.500)" // Warm, inviting gradient for in-progress
                        color="white" // White text for contrast
                        px={3}
                        py={1.5}
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                        gap={1}
                        minWidth="fit-content"
                        shadow="md"
                        animation="pulse 2s infinite ease-in-out" // Add a subtle pulse animation
						_hover={{
							bgGradient: "linear(to-r, orange.500, yellow.600)", // Darker gradient on hover
							transform: "scale(1.05)", // Slightly enlarge on hover
						}}
                    >
                        <LuTimer size={14} /> {/* Icon for In Progress */}
                        <Text fontSize="xs" fontWeight="bold" lineHeight="normal" mt={1}>In Progress</Text>
                    </Badge>
                )}
                {/* --- END OF IMPROVED BADGES --- */}

            </Flex>
            <Flex gap={2} alignItems={"center"}>
                <IconButton
                    aria-label="Mark as complete"
                    icon={isUpdating ? <Spinner size={"sm"} /> : <FaCheckCircle size={20} />}
                    onClick={() => updateTodo()}
                    colorScheme="green"
                    variant="ghost"
                    size="lg" 
                    borderRadius="full"
                    _hover={{
                        bg: useColorModeValue("green.100", "green.800"),
                        color: useColorModeValue("green.600", "green.400"), 
                        transform: "scale(1.1)",
                        shadow: "md",
                    }}
                    _active={{
                        transform: "scale(0.9)",
                    }}
                    isLoading={isUpdating}
                />

                <IconButton
                    aria-label="Delete todo"
                    icon={isDeleting ? <Spinner size={"sm"} /> : <MdDelete size={22} />}
                    onClick={() => deleteTodo()}
                    colorScheme="red" 
                    variant="ghost"
                    size="lg"
                    borderRadius="full"
                    _hover={{
                        bg: useColorModeValue("red.100", "red.800"), 
                        color: useColorModeValue("red.600", "red.400"),
                        transform: "scale(1.1)",
                        shadow: "md",
                    }}
                    _active={{
                        transform: "scale(0.9)",
                    }}
                    isLoading={isDeleting}
                />
            </Flex>
        </Flex>
    );
};
export default TodoItem;
