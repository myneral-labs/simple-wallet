import { useState, useEffect, useRef } from 'react';
import { Flex, useToast, Box } from '@chakra-ui/react';

import ButtonFlex from 'src/components/Shared/Flex';
import Navbar from 'src/components/Layout/Navbar';
import ScreenView from 'src/components/Layout/ScreenView';
import Container from 'src/components/Layout/Container';
import CoolButton from 'src/components/Shared/Button';
import Text from 'src/components/Shared/Text';

const TransactionListModal = ({ onClose }) => {
  const toast = useToast();

  // Hardcoded transactions
  const transactions = [
    { id: 1, name: 'Transaction 1', amount: '100', duration: '12' },
    { id: 2, name: 'Transaction 2', amount: '200', duration: '24' },
    // Add more transactions as needed
  ];

  return (
    <>
      <Navbar type='modal' title='Recent Transactions' onClose={onClose} />
      <ScreenView alignItems='center' justifyContent='center'>
        <Container size='small'>
          <Flex flexDirection='column' alignItems='center' gap='20px'>
            {transactions.map((transaction) => (
              <Box key={transaction.id} p={5} shadow="md" borderWidth="1px">
                <Text>Name: {transaction.name}</Text>
                <Text>Amount: {transaction.amount}</Text>
                <Text>Duration: {transaction.duration}</Text>
              </Box>
            ))}
          </Flex>
        </Container>
      </ScreenView>
      <ButtonFlex background='gray5' direction={{ base: 'column-reverse', md: 'row' }} justify={'center'} gap={8}>
        <CoolButton type='bezeledGray' onClick={onClose}>Back</CoolButton>
      </ButtonFlex>
    </>
  );
};

export default TransactionListModal;