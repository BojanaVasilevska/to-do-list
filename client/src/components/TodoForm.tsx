/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, Input, Spinner, useColorModeValue } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { BASE_URL } from "../App";

const TodoForm = () => {
    const [newTodo, setNewTodo] = useState("");
    const queryClient = useQueryClient();

    const inputBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");
    const inputBorderColor = useColorModeValue("gray.300", "gray.600");
    const inputFocusBorderColor = useColorModeValue("blue.400", "teal.300");
    const buttonColorScheme = useColorModeValue("purple", "teal");

    const { mutate: createTodo, isPending: isCreating } = useMutation({
        mutationKey: ['createTodo'],
        mutationFn: async (e: React.FormEvent) => {
            e.preventDefault();
            if (!newTodo.trim()) {
                alert("Todo cannot be empty!");
                return;
            }
            try {
                const res = await fetch(BASE_URL + `/todos`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ body: newTodo })
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }

                setNewTodo("");
                return data;

            } catch (error: any) {
                alert(error.message);
                throw new Error(error);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
        onError: (error: any) => {
            console.error("Error creating todo:", error);
        }
    });

    return (
        <form onSubmit={createTodo}>
            <Flex gap={2}>
                <Input
                    type='text'
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new ultra task..."
                    _placeholder={{ color: useColorModeValue("gray.500", "gray.400") }}
                    bg={inputBg}
                    borderColor={inputBorderColor}
                    _focus={{
                        borderColor: inputFocusBorderColor,
                        boxShadow: `0 0 0 1px ${inputFocusBorderColor}`,
                    }}
                    borderRadius="lg"
                    size="lg"
                    p={3}
                />
                <Button
                    type='submit'
                    colorScheme={buttonColorScheme}
                    _hover={{
                        transform: "scale(1.02)",
                    }}
                    _active={{
                        transform: "scale(.95)",
                    }}
                    borderRadius="lg" 
                    px={6} 
                    size="lg" 
                    isLoading={isCreating}
                    spinner={<Spinner size={"sm"} color="white" />}
                >
                    {!isCreating && <IoMdAdd size={25} />}
                </Button>
            </Flex>
        </form>
    );
};
export default TodoForm;
