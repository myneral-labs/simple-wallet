import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Text as TextDemo } from '@chakra-ui/react';
import { ArrowDown, ArrowUp, Key } from 'react-feather';

import { useAccount } from '../context/Account';
import { useToken } from '../context/Token';

import Text from '../components/Shared/Text';
import ButtonCircle from '../components/Shared/ButtonCircle';
import Link from '../components/Shared/Link';

import Navbar from 'src/components/Layout/Navbar';
import Container from 'src/components/Layout/Container';
import ScreenView from 'src/components/Layout/ScreenView';
import FullModal from 'src/components/FullModal';
import Flex from 'src/components/Shared/Flex';
import Divider from 'src/components/Shared/Divider';

import Token from '../components/Token';

import { cryptoToGHS, formatPrice } from '../hooks/usePrice';

// import { getPrice } from './api/thegraph';
import { getPrices } from './api/prices';

export async function getStaticProps() {
  const { success, data } = await getPrices();

  if (success) {
    return {
      props: {
        price: {
          eth: data.find((token) => token.name === 'eth'),
          dai: data.find((token) => token.name === 'dai'),
          ghc: data.find((token) => token.name === 'ghc'),
        },
      },
    };
  }
}

const Dashboard = ({ price }) => {
  const { wallet } = useAccount();
  const { tokens } = useToken();

  if (!tokens) return null;

  // General
  const [modalType, setModalType] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [typeModal, setTypeModal] = useState('');

  const handleOpenFullModal = (type) => {
    setTypeModal(type);
    setModalType(type);
    setOpenModal(true);
  };

  const handleCloseFullModal = () => {
    setOpenModal(false);
    setModalType('');
  };

  return (
    <>
      <Head>
        <title>Wallet - Wellmax</title>
      </Head>
      <Navbar type={openModal ? 'modal' : 'page'} title={typeModal || ''} onClose={handleCloseFullModal} />
      <ScreenView justifyContent='center'>
        <Container size='small'>
          {/* Balance */}
          <Flex direction='column' align='center'>
            <Flex justify='center' align='center' gap={8}>
              <Text size='small'>Your Balance</Text>
              {/* POC */}
              <TextDemo
                bg='terciary15'
                color='terciary'
                p='4px 12px'
                borderRadius={99}
                fontSize='12px'
                fontWeight={'bold'}
                textTransform={'uppercase'}
              >
                GhanaNet
              </TextDemo>
            </Flex>
            <Divider y={16} />
            <Text fontSize={32} isBold>
              GH₵ 
              {formatPrice(
                Number(
                  cryptoToGHS(price?.ghc?.values?.bid, tokens?.eth) + cryptoToGHS(price?.dai?.values?.bid, tokens?.dai),
                ).toFixed(2),
                2,
              )}
            </Text>
          </Flex>

          <Divider y={32} />

          {/* Botones */}
          <Flex justify='center'>
            <ButtonCircle brand='secondary' onClick={() => handleOpenFullModal('send')} title='Send'>
              <ArrowUp color='#111' />
            </ButtonCircle>
            <Divider x={16} />
            <ButtonCircle onClick={() => handleOpenFullModal('receive')} title='Receive'>
              <ArrowDown color='#111' />
            </ButtonCircle>
            <Divider x={16} />
            <ButtonCircle brand='terciary' onClick={() => handleOpenFullModal('receive')} title='New Loan'>
              <Key color='#111' />
            </ButtonCircle>
          </Flex>

          <Divider y={32} />

          {/* Tokens */}
          <Token name='WellMax Credit' token={tokens?.eth} price={cryptoToGHS(price?.ghc?.values?.bid, tokens?.eth)} readOnly />
          {/* <Token name='dai' token={tokens?.dai} price={cryptoToGHS(price?.dai?.values?.bid, tokens?.dai)} readOnly /> */}
        </Container>
      </ScreenView>

      {/* Security */}
      {wallet && !wallet?.backup && (
        <Flex background='terciary15'>
          <Container>
            <Divider y={16} />
            <Flex direction={{ base: 'column', md: 'row' }} align='normal' justify='center' gap={8}>
              <Flex align='center'>
                <Text>
                  It is very important you keep this <strong>back up phrase</strong>, safe.
                </Text>
              </Flex>
              <Link href='/settings/backup' brand='terciary' passHref>
                Backup Phrase
              </Link>
            </Flex>
            <Divider y={16} />
          </Container>
        </Flex>
      )}

      <FullModal type={modalType} open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default Dashboard;
