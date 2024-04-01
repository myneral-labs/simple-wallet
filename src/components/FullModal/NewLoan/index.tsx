import { useState, useEffect, useRef } from 'react';
import { Flex, FormControl, Button, useToast } from '@chakra-ui/react';

import ButtonFlex from 'src/components/Shared/Flex';
import Navbar from 'src/components/Layout/Navbar';
import ScreenView from 'src/components/Layout/ScreenView';
import Container from 'src/components/Layout/Container';
import CoolButton from 'src/components/Shared/Button';
import Input from 'src/components/Shared/Input';
import FormLabel from 'src/components/Shared/Text';

const LoanRequestForm = ({ onClose }) => {
  const toast = useToast();
  // Add a state variable to track the form completion status
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('');
  const timeoutRef = useRef(null);
  useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      checkFormCompletion(name, amount, duration);
    }, 1000);
  }, [name, amount, duration]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
    toast({ description: 'Loan request submitted', status: 'success' });
    onClose();
  };
  const checkFormCompletion = (name, amount, duration) => {
    if (name && amount && duration) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  };
  return (
    <>
      <Navbar type='modal' title='Loan Request' onClose={onClose} />
      <ScreenView alignItems='center' justifyContent='center'>
        <Container size='small'>
          <Flex as='form' flexDirection='column' alignItems='center' gap='20px' onSubmit={handleSubmit}>
            <FormControl id='name' isRequired>
              <FormLabel>Name</FormLabel>
              <Input type='text' value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl id='amount' isRequired>
              <FormLabel>Loan Amount</FormLabel>
              <Input type='number' value={amount} onChange={(e) => setAmount(e.target.value)} />
            </FormControl>
            <FormControl id='duration' isRequired>
              <FormLabel>Loan Duration (in months)</FormLabel>
              <Input type='number' value={duration} onChange={(e) => setDuration(e.target.value)} />
            </FormControl>
          </Flex>
        </Container>
      </ScreenView>
      <ButtonFlex background='gray5' direction={{ base: 'column-reverse', md: 'row' }} justify={'center'} gap={8}>
        <CoolButton type='bezeledGray' onClick={onClose}>Back</CoolButton>
        <CoolButton type='submit' isDisabled={!isFormComplete}>Submit</CoolButton>
      </ButtonFlex>
    </>
  );
};

export default LoanRequestForm;