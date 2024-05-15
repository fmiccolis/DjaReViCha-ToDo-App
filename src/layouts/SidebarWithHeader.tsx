import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    useColorModeValue,
    Text,
    Drawer,
    DrawerContent,
    useDisclosure,
    BoxProps,
    FlexProps,
    Menu,
    MenuButton,
    MenuItem,
    MenuList, Link,
} from '@chakra-ui/react'
import {
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi'
import {UserProps} from "../types/dataTypes";
import {useContext} from "react";
import {AppContext} from "../providers/AppProvider";
import {NavLink} from "react-router-dom";
import Nav from "../Nav";

interface SidebarWithHeaderProps {
  children: React.ReactNode
}

interface MobileProps extends FlexProps {
  user: UserProps,
  onOpen: () => void
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            overflow={"auto"}
            {...rest}
        >
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="xl" fontFamily="monospace" fontWeight="bold" margin={{base: "0", md: "1"}}>
                    Your Site
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            <Nav />
        </Box>
    )
}

const MobileNav = ({ onOpen, user, ...rest }: MobileProps) => {
    const {logout} = useContext(AppContext)
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text
        display={{ base: 'flex', md: 'none' }}
        textAlign={'center'}
        fontSize="xl"
        fontFamily="monospace"
        margin={0}
        fontWeight="bold"
      >
        Your Site
      </Text>
      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    user.profile_pic
                  }
                  name={user.first_name + " " + user.last_name}
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  mx="2">
                  <Text fontSize="sm" m={0}>{user.first_name + " " + user.last_name}</Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem _hover={{bg: "gray.500"}}>
                  <Link
                    as={NavLink}
                    to={"/profile"}
                    width={"100%"}
                    _hover={{
                      textDecoration: "none",
                      color: "white"
                    }}
                    _groupHover={{
                      bg: "gray.500"
                    }}
                  >Profile</Link>
              </MenuItem>
              <MenuItem _hover={{bg: "gray.500"}}>
                  <Link
                    as={NavLink}
                    to={"/settings"}
                    width={"100%"}
                    _hover={{
                      textDecoration: "none",
                      color: "white"
                    }}
                    _groupHover={{
                      bg: "gray.500"
                    }}
                  >Settings</Link>
              </MenuItem>
                {user.is_superuser && <MenuItem _hover={{bg: "gray.500"}}>
                  <Link
                      href='./admin'
                      width={"100%"}
                    _hover={{
                      textDecoration: "none",
                      color: "white"
                    }}
                    _groupHover={{
                      bg: "gray.500"
                    }}
                  >Django administration</Link>
              </MenuItem>}
              <MenuItem _hover={{bg: "gray.500"}}>
                  <Link
                    as={NavLink}
                    width={"100%"}
                    _hover={{
                      textDecoration: "none",
                      color: "white"
                    }}
                    _groupHover={{
                      bg: "gray.500"
                    }}
                    color={"red.500"}
                    onClick={() => logout()}
                  >Logout</Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}

const SidebarWithHeader = ({children}: SidebarWithHeaderProps) => {
  const {user} = useContext(AppContext)
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" minW={"100vw"} bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} user={user} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  )
}

export default SidebarWithHeader