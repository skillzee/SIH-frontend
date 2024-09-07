import React, { useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, Select, VStack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Country, State, City } from 'country-state-city';
import { useNavigate } from 'react-router-dom';
import ReactSelect from 'react-select';

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'white',
    color: 'black',
    borderColor: '#CBD5E0',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#A0AEC0',
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'white',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#2C7A7B' : state.isFocused ? '#E6FFFA' : 'white',
    color: state.isSelected ? 'white' : 'black',
    '&:hover': {
      backgroundColor: '#B2F5EA',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'black',
  }),
};

const DonorSignup = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Add country, state, and city to form data
      const formData = {
        ...data,
        country: selectedCountry?.value || '',
        state: selectedState?.value || '',
        city: selectedCity?.value || '',
      };

      console.log('Submitting form data:', formData); // Debugging statement

      const response = await axios.post('https://sih-only-backend.onrender.com/api/donor/register', formData);

      if (response.status === 200) {
        toast({
          title: 'Signup successful.',
          description: 'You have successfully signed up as a donor.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        reset();
        navigate('/');
      }
    } catch (error) {
      toast({
        title: 'Signup failed.',
        description: error.response?.data?.message || 'There was an error signing up. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxW="lg"
      mx="auto"
      mt={10}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading mb={6} textAlign="center">Donor Signup</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Enter your full name"
              {...register('name', { required: 'Name is required' })}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              {...register('email', { required: 'Email is required' })}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              {...register('password', { required: 'Password is required' })}
            />
          </FormControl>

          {/* Country Dropdown */}
          <FormControl isRequired>
            <FormLabel>Country</FormLabel>
            <ReactSelect
              styles={customStyles}
              options={Country.getAllCountries().map(country => ({
                label: country.name,
                value: country.isoCode
              }))}
              onChange={(option) => {
                setSelectedCountry(option);
                setSelectedState(null); // Reset state when country changes
                setSelectedCity(null);  // Reset city when country changes
              }}
              value={selectedCountry}
              placeholder="Select your country"
            />
          </FormControl>

          {/* State Dropdown */}
          <FormControl isRequired>
            <FormLabel>State</FormLabel>
            <ReactSelect
              styles={customStyles}
              options={selectedCountry ? State.getStatesOfCountry(selectedCountry.value).map(state => ({
                label: state.name,
                value: state.isoCode
              })) : []}
              onChange={(option) => {
                setSelectedState(option);
                setSelectedCity(null);  // Reset city when state changes
              }}
              value={selectedState}
              placeholder="Select your state"
              isDisabled={!selectedCountry}
            />
          </FormControl>

          {/* City Dropdown */}
          <FormControl isRequired>
            <FormLabel>City</FormLabel>
            <ReactSelect
              styles={customStyles}
              options={selectedState ? City.getCitiesOfState(selectedCountry.value, selectedState.value).map(city => ({
                label: city.name,
                value: city.name
              })) : []}
              onChange={setSelectedCity}
              value={selectedCity}
              placeholder="Select your city"
              isDisabled={!selectedState}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input
              placeholder="Enter your phone number"
              {...register('phoneNumber', { required: 'Phone number is required' })}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Blood Group</FormLabel>
            <Select
              placeholder="Select your blood group"
              {...register('bloodGroup', { required: 'Blood group is required' })}
            >
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </Select>
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            w="full"
            isLoading={loading}
          >
            Sign Up
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default DonorSignup;
