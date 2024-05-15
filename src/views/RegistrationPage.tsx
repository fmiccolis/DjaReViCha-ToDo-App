import React, {useContext, useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {AppContext} from "../providers/AppProvider";
import {
    AbsoluteCenter, Alert, AlertDescription, AlertIcon, AlertTitle,
    Box,
    Button, Divider,
    Flex,
    FormControl, FormErrorMessage,
    FormLabel,
    Heading, IconButton, Image,
    Input,
    InputGroup,
    InputRightElement,
    Stack, Text,
    useDisclosure
} from "@chakra-ui/react";
import {HiEye, HiEyeOff} from "react-icons/hi";

const RegistrationPage = () => {
    const props = useLocation()
    const pass1Ref = useRef<HTMLInputElement>(null)
    const pass2Ref = useRef<HTMLInputElement>(null)
    const { register, error, setError } = useContext(AppContext);
    const { isOpen: isOpen1, onToggle :onToggle1 } = useDisclosure()
    const { isOpen: isOpen2, onToggle :onToggle2 } = useDisclosure()
    const navigate = useNavigate()

    const [email, setEmail] = useState<string>("")
    const [username, setUsername] = useState<string>(props.state.username || "")
    const [password1, setPassword1] = useState<string>("")
    const [password2, setPassword2] = useState<string>("")

    const onClickReveal = (index: number = 1 | 2) => {
        if(index === 1) {
            onToggle1()
            if (pass1Ref.current) {
                pass1Ref.current.focus({ preventScroll: true })
            }
        } else {
            onToggle2()
            if (pass2Ref.current) {
                pass2Ref.current.focus({ preventScroll: true })
            }
        }
    }

    const handleSubmit = () => {
        setError(null)
        register(email, username, password1, password2)
    }

    useEffect(() => setError(null), [username, email, password2, password1])

    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Heading fontSize={'2xl'}>Register</Heading>
                    <FormControl id="email" isInvalid={(error && error.email)}>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        {(error && error.email) && <FormErrorMessage>{error.email.join(', ')}</FormErrorMessage>}
                    </FormControl>
                    <FormControl id="username" isInvalid={(error && error.username)}>
                        <FormLabel>Username</FormLabel>
                        <Input type="text" name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                        {(error && error.username) && <FormErrorMessage>{error.username.join(', ')}</FormErrorMessage>}
                    </FormControl>
                    <FormControl id="password1" isInvalid={(error && error.password1)}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <InputRightElement>
                                <IconButton
                                    variant="text"
                                    aria-label={isOpen1 ? 'Mask password' : 'Reveal password'}
                                    icon={isOpen1 ? <HiEyeOff /> : <HiEye />}
                                    onClick={() => onClickReveal(1)}
                                />
                            </InputRightElement>
                            <Input ref={pass1Ref} type={isOpen1 ? "text" : "password"} name='password1' onChange={(e) => setPassword1(e.target.value)} />
                        </InputGroup>
                        {(error && error.password1) && <FormErrorMessage>{error.password1.join(', ')}</FormErrorMessage>}
                    </FormControl>
                    <FormControl id="password2" isInvalid={(error && error.password2)}>
                        <FormLabel>Ripeti Password</FormLabel>
                        <InputGroup>
                            <InputRightElement>
                                <IconButton
                                    variant="text"
                                    aria-label={isOpen2 ? 'Mask password' : 'Reveal password'}
                                    icon={isOpen2 ? <HiEyeOff /> : <HiEye />}
                                    onClick={() => onClickReveal(2)}
                                />
                            </InputRightElement>
                            <Input ref={pass2Ref} type={isOpen2 ? "text" : "password"} name='password2' onChange={(e) => setPassword2(e.target.value)} />
                        </InputGroup>
                        {(error && error.password2) && <FormErrorMessage>{error.password2.join(', ')}</FormErrorMessage>}
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
                              <AlertTitle>Unable to perform registration!</AlertTitle>
                              <AlertDescription>{error.non_field_errors.join(', ')}</AlertDescription>
                            </Alert>
                        }
                        <Button colorScheme={'blue'} variant={'solid'} onClick={handleSubmit}>
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

export default RegistrationPage;