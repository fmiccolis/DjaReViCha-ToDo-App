import React from 'react';
import {routeProps, routes} from "./routes";
import {Flex, Icon, Link} from "@chakra-ui/react";
import {NavLink as RouterLink} from "react-router-dom";

const SidebarNavItem = (props: { navItem: routeProps; }) => {
    const {navItem} = props
    return (
        <Link
            key={navItem.name}
            as={RouterLink}
            to={navItem.destination}
            _activeLink={{
                color: 'cyan.400',
            }}
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}
        >
            <Flex
                align="center"
                px="4"
                py="3"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _groupActive={{bg: 'cyan.400'}}
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
            >
                {navItem.icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={navItem.icon}
                    />
                )}
                {navItem.name}
            </Flex>
        </Link>
    )
}

const Nav = () => <>{routes.filter(route => route.showInSidebar).map((element) => <SidebarNavItem key={element.name} navItem={element} />)}</>

export default Nav;