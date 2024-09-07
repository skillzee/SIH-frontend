import React from 'react';
import {Link} from "react-router-dom"
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Image,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Links = ['Home', 'About', 'Services', 'Contact'];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: 'gray.200',
    }}
    to={`${children.toLowerCase()}`}>
    {children}
  </Link>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={'black'} px={4} width="100vw">
      <Flex
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}
        maxW={'container.xl'}
        mx="auto"
        width="100%"
      >
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />

        <HStack spacing={8} alignItems={'center'} width="100%">
          <Box>
            <Image
              src="https://via.placeholder.com/150"
              alt="Logo"
              w="50px"
            />
          </Box>
          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}
            width="100%"
            justifyContent="center"
          >
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </HStack>
        </HStack>

        <Flex alignItems={'center'} width="100%" justifyContent="flex-end">
          <Button
            as={Link}
            to={'selection'}
            variant={'solid'}
            colorScheme={'teal'}
            size={'sm'}
            mr={4}>
            Sign Up
          </Button>
          <Button
            as={Link}
            to={'login'}
            variant={'outline'}
            colorScheme={'teal'}
            size={'sm'}>
            Login
          </Button>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
