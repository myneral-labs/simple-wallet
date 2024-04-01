import { useState, useEffect, useRef } from 'react';
import { Flex, useToast, Box, Badge, Link, Container } from '@chakra-ui/react';

import ButtonFlex from 'src/components/Shared/Flex';
import Navbar from 'src/components/Layout/Navbar';
import ScreenView from 'src/components/Layout/ScreenViewTwo';
// import Container from 'src/components/Layout/Container';
import CoolButton from 'src/components/Shared/Button';
import Text from 'src/components/Shared/Text';

// Import the useToken hook
import { useToken } from 'src/context/Token';

const TransactionListModal = ({ onClose }) => {
  const toast = useToast();

  // Use the useToken hook to access the transaction history
  const { transactionHistory } = useToken();

  return (
    <>
      <Navbar type='modal' title='Recent Transactions' onClose={onClose} />
      <ScreenView alignItems='center' justifyContent='center'>
        <Container size='small'>
          <Flex flexDirection='column' alignItems='center' gap='20px'>
            {transactionHistory.map((transaction, index) => (
              <Box key={index} p={5} shadow="md" borderWidth="1px" borderRadius="lg" overflow="hidden" width={{ base: "100%", md: "auto" }}>
                <Flex justify="space-between" flexDirection={{ base: "column", md: "row" }}>
                  <Text fontWeight="bold">Hash:&nbsp;</Text>
                  <Link href={`https://explorer.myneral.com/tx/${transaction.hash}`} color="teal.500">
                    {transaction.hash}
                  </Link>
                </Flex>
                <Flex justify="space-between" flexDirection={{ base: "column", md: "row" }}>
                  <Text fontWeight="bold">From:&nbsp;</Text>
                  <Link href={`https://explorer.myneral.com${transaction.fromLinks[0].href}`} color="teal.500">
                    {transaction.fromLinks[0].display}
                  </Link>
                </Flex>
                <Flex justify="space-between" flexDirection={{ base: "column", md: "row" }}>
                  <Text fontWeight="bold">To:&nbsp;</Text>
                  <Link href={`https://explorer.myneral.com${transaction.toLinks[0].href}`} color="teal.500">
                    {transaction.toLinks[0].display}
                  </Link>
                </Flex>
                <Flex justify="space-between" flexDirection={{ base: "column", md: "row" }}>
                  <Text fontWeight="bold">Value:&nbsp;</Text>
                  <Text>{transaction.ethValue} GHC</Text>
                </Flex>
                <Flex justify="space-between" flexDirection={{ base: "column", md: "row" }}>
                  <Text fontWeight="bold">Transaction Type:&nbsp;</Text>
                  <Text>{transaction.transactionType}</Text>
                </Flex>
                <Flex justify="space-between" flexDirection={{ base: "column", md: "row" }}>
                  <Text fontWeight="bold">Status:&nbsp;</Text>
                  <Badge colorScheme={transaction.status === "0x1" ? "green" : "red"}>
                    {transaction.status === "0x1" ? "Success" : "Failed"}
                  </Badge>
                </Flex>
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