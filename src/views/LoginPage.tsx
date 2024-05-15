import React, {useContext, useEffect, useRef, useState} from 'react';
import {AppContext} from "../providers/AppProvider";
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    IconButton, Input,
    InputGroup,
    InputRightElement,
    Stack,
    Image,
    Text,
    useDisclosure, Link, Divider, AbsoluteCenter, Box, FormErrorMessage, Alert, AlertIcon, AlertTitle, AlertDescription
} from "@chakra-ui/react";
import {HiEye, HiEyeOff} from "react-icons/hi";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const { login, error, setError} = useContext(AppContext);
    const { isOpen, onToggle } = useDisclosure()
    const navigate = useNavigate()

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const onClickReveal = () => {
        onToggle()
        if (inputRef.current) {
            inputRef.current.focus({ preventScroll: true })
        }
    }

    const handleSubmit = () => {
        setError(null)
        login(username, password)
    }

    useEffect(() => setError(null), [username, password])

    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Heading fontSize={'2xl'}>Login to your site</Heading>
                    <FormControl id="username" isInvalid={(error && error.username)}>
                        <FormLabel>Username</FormLabel>
                        <Input type="text" name='username' onChange={(e) => setUsername(e.target.value)} />
                        {(error && error.username) && <FormErrorMessage>{error.username.join(', ')}</FormErrorMessage>}
                    </FormControl>
                    <FormControl id="password" isInvalid={(error && error.password)}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <InputRightElement>
                                <IconButton
                                    variant="text"
                                    aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                                    icon={isOpen ? <HiEyeOff /> : <HiEye />}
                                    onClick={onClickReveal}
                                />
                            </InputRightElement>
                            <Input ref={inputRef} type={isOpen ? "text" : "password"} name='password' onChange={(e) => setPassword(e.target.value)} />
                        </InputGroup>
                        {(error && error.password) && <FormErrorMessage>{error.password.join(', ')}</FormErrorMessage>}
                    </FormControl>
                    <Stack spacing={6}>
                        <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            align={'start'}
                            justify={'flex-end'}
                        >
                            <Text color={'blue.500'} onClick={() => navigate('/')} cursor={"pointer"}>Go back to presentation</Text>
                        </Stack>
                        {(error && error.non_field_errors) &&
                            <Alert status='error'>
                              <AlertIcon />
                              <AlertTitle>Unable to perform login!</AlertTitle>
                              <AlertDescription>{error.non_field_errors.join(', ')}</AlertDescription>
                            </Alert>
                        }
                        <Button colorScheme={'blue'} variant={'solid'} onClick={handleSubmit}>
                            Login
                        </Button>
                        <Box position='relative' padding='5'>
                          <Divider />
                          <AbsoluteCenter bg='white' px='4'>
                            or
                          </AbsoluteCenter>
                        </Box>
                        <Button colorScheme={'purple'} variant={'solid'} onClick={() => navigate('/registration', {state:{username, password}})}>
                            Register
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
            <Flex flex={1}>
                <Image
                    alt={'Login Image'}
                    objectFit={'cover'}
                    src={
                        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
                    }
                />
            </Flex>
        </Stack>
    );
};

export default LoginPage;