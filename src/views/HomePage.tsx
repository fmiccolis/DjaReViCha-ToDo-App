import React, {MouseEventHandler, useContext, useState} from 'react';
import {useGetToDos} from "../hooks/content/ContentManager";
import {ToDoProps} from "../types/dataTypes";
import {Heading, Text, Card, CardHeader, CardBody, CardFooter, Box, Flex, FormControl, Stack, FormLabel, Input, Spacer, Textarea, FormErrorMessage, Button, Alert, AlertIcon, AlertTitle, AlertDescription} from "@chakra-ui/react";
import axios from 'axios';
import { CREATE_TODO, DELETE_TODO, UPDATE_TODO } from '../utils/endpoints';
import { AppContext } from '../providers/AppProvider';
import { useQueryClient } from '@tanstack/react-query';

const default_todo: ToDoProps = {
    description: "",
    done_date: "",
    due_date: "",
    owner: null,
    title: "",
    id: null
}

const ToDoCard = ({todo, onDone, onDelete}: {todo: ToDoProps, onDone: MouseEventHandler<HTMLButtonElement>, onDelete: MouseEventHandler<HTMLButtonElement>}) => {
    return (
        <Card bg='teal.100'>
            <CardHeader>
                <Heading size='md' textDecoration={todo.done_date ? "line-through" : 'none'}>{todo.title}</Heading>
            </CardHeader>
            <CardBody>
                <Text textDecoration={todo.done_date ? "line-through" : 'none'}>{todo.description}</Text>
                {todo.done_date && todo.done_date !== "" && <Text>{todo.done_date.toLocaleString('it-IT', {day: "numeric", month: "2-digit", year: "numeric"})}</Text>}
            </CardBody>
            <CardFooter>
                <Button onClick={onDone}>Set as done</Button>
                <Button onClick={onDelete} colorScheme='red'>delete</Button>
            </CardFooter>
        </Card>
    );
}

const HomePage = () => {
    const {user} = useContext(AppContext)
    const {todos} = useGetToDos()
    const queryClient = useQueryClient();

    const [todo, setTodo] = useState<ToDoProps>({...default_todo, owner: user.id});
    const [error, setError] = useState<any>();

    const updateValue = (propName: "title" | "description" | "owner" | "due_date" | "done_date", newValue: string | Date) => {
        setTodo(old => ({...old, [propName]: newValue}))
    }

    const handleSubmit = () => {
        console.log({todo})
        axios
            .post(CREATE_TODO, todo)
            .then(res => {
                queryClient.invalidateQueries({
                    queryKey: ['todos', {user: user.id}]
                })
                setTodo({...default_todo, owner: user.id})
            })
            .catch(err => setError(err.response.data))
    }

    const updateTodo = (instance: ToDoProps) => {
        let today = new Date();
        let done_date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`

        axios
            .put(UPDATE_TODO(instance.id), {...instance, done_date})
            .then(res => {
                queryClient.invalidateQueries({
                    queryKey: ['todos', {user: user.id}]
                })
            })
            .catch(err => setError(err.response.data))
    }

    const deleteTodo = (todoId: number) => {
        axios
            .delete(DELETE_TODO(todoId))
            .then(res => {
                queryClient.invalidateQueries({
                    queryKey: ['todos', {user: user.id}]
                })
            })
            .catch(err => setError(err.response.data))
    }

    return (
        <Box bg={"white"} w={"full"} borderRadius={5} p={4}>
            <Flex direction={{base: 'column', sm: 'row'}}>
                <Box p={3}>
                    <FormControl id="title" isInvalid={(error && error.title)} mb={3}>
                        <FormLabel>Title</FormLabel>
                        <Input type="text" name='title' value={todo?.title} onChange={(e) => updateValue("title", e.target.value)} />
                        {(error && error.title) && <FormErrorMessage>{error.title.join(', ')}</FormErrorMessage>}
                    </FormControl>
                    <FormControl id="description" isInvalid={(error && error.description)} mb={3}>
                        <FormLabel>Description</FormLabel>
                        <Textarea name='title' value={todo?.description} onChange={(e) => updateValue("description", e.target.value)}  />
                        {(error && error.description) && <FormErrorMessage>{error.description.join(', ')}</FormErrorMessage>}
                    </FormControl>
                    <FormControl id="due_date" isInvalid={(error && error.due_date)} mb={3}>
                        <FormLabel>Due Date</FormLabel>
                        <Input type="date" name='due_date' value={todo?.due_date} onChange={(e) => updateValue("due_date", e.target.value)} />
                        {(error && error.due_date) && <FormErrorMessage>{error.due_date.join(', ')}</FormErrorMessage>}
                    </FormControl>
                    <FormControl mb={3}>
                        {(error && error.non_field_errors) &&
                            <Alert status='error'>
                              <AlertIcon />
                              <AlertTitle>Unable to save todo!</AlertTitle>
                              <AlertDescription>{error.non_field_errors.join(', ')}</AlertDescription>
                            </Alert>
                        }
                        <Button colorScheme={'blue'} variant={'solid'} onClick={handleSubmit}>
                            Save
                        </Button>
                    </FormControl>
                </Box>
                <Spacer />
                <Flex p={3} gap={2} direction={"column"}>
                    <Text>Here are listed the things to do</Text>
                    {todos.results.map(td => (
                        <ToDoCard 
                            key={td.id} 
                            todo={td} 
                            onDone={() => updateTodo(td)}
                            onDelete={() => deleteTodo(td.id)}
                        />
                    ))}
                    {todos.results.length === 0 && 
                        <Alert status='info' flexDirection={'column'} textAlign={'center'} justifyContent={'center'}>
                            <AlertIcon />
                            <AlertTitle>There is nothing to do!</AlertTitle>
                            <AlertDescription>Use the form to add something</AlertDescription>
                        </Alert>
                    }
                </Flex>
            </Flex>
        </Box>
    );
};

export default HomePage;