import React from 'react';
import { Box, Image, Flex, Text, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Selection = () => {
  const navigate = useNavigate();

  const handleSelection = (role) => {
    navigate(`/signup/${role}`);
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      p={5}
    >
      <HStack spacing={8} wrap="wrap" justify="center">
        <Box
          w="300px"
          h="200px"
          bg="gray.100"
          borderRadius="lg"
          shadow="md"
          _hover={{ cursor: 'pointer', transform: 'scale(1.05)' }}
          onClick={() => handleSelection('donor')}
        >
          <Image
            src="https://via.placeholder.com/300x200?text=Donor"
            alt="Donor"
            borderRadius="lg"
          />
          <Text mt={2} fontSize="lg" fontWeight="bold" textAlign="center">Donor</Text>
        </Box>

        <Box
          w="300px"
          h="200px"
          bg="gray.100"
          borderRadius="lg"
          shadow="md"
          _hover={{ cursor: 'pointer', transform: 'scale(1.05)' }}
          onClick={() => handleSelection('recipient')}
        >
          <Image
            src="https://via.placeholder.com/300x200?text=Recipient"
            alt="Recipient"
            borderRadius="lg"
          />
          <Text mt={2} fontSize="lg" fontWeight="bold" textAlign="center">Recipient</Text>
        </Box>
      </HStack>
    </Flex>
  );
};

export default Selection;
