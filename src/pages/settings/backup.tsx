// @ts-nocheck
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Head from 'next/head';
import { Box, useDisclosure, VStack, HStack, useToast, Checkbox } from '@chakra-ui/react';

import { useAccount } from 'src/context/Account';
import { db } from 'src/utils/db';
import { decrypt } from 'src/hooks/useCrypto';

import Navbar from 'src/components/Layout/Navbar';
import Container from 'src/components/Layout/Container';
import ScreenView from 'src/components/Layout/ScreenView';
import Modal from 'src/components/Modal';
import Heading from 'src/components/Shared/Heading';
import Text from 'src/components/Shared/Text';
import Link from 'src/components/Shared/Link';
import Flex from 'src/components/Shared/Flex';
import Divider from 'src/components/Shared/Divider';
import Button from 'src/components/Shared/Button';
import Mnemonic from 'src/components/Mnemonic';

const Backup = () => {
  // Chakra
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { wallet } = useAccount();

  const mnemonic = decrypt(wallet?.seedPhrase)?.replaceAll('"', '');

  const [hasSave, setHasSave] = useState(false);

  const [showMnemonic, setShowMnemonic] = useState(false);
  const [showValidateMnemonic, setShowValidateMnemonic] = useState(false);

  const [localMnemonic, setLocalMnemonic] = useState(['', '', '', '', '', '', '', '', '', '', '', '']);

  useEffect(() => {
    if (mnemonic) {
      setLocalMnemonic(mnemonic?.split(' '));
    }
  }, [mnemonic]);

  const handleChangeMnemonic = (value, index) => {
    let newMnemonic = localMnemonic;
    newMnemonic[index] = value;
    setLocalMnemonic(newMnemonic);
  };

  const handleSubmit = async (localMnemonic) => {
    const isValid = ethers.utils.isValidMnemonic(localMnemonic.join(' '));
    if (isValid) {
      await db.wallets.update(1, { backup: true });
      onOpen();
    } else {
      toast({
        title: 'Incorrect seed phrase',
        description: 'Please verify that the seed phrase is correct.',
        status: 'warning',
      });
    }
  };

  const handleShowMnemonic = () => {
    setShowMnemonic(true);
  };

  const handleConfirmSaveMnemonic = () => {
    setShowValidateMnemonic(true);
    setLocalMnemonic(['', '', '', '', '', '', '', '', '', '', '', '']);
  };

  return (
    <>
      <Head>
        <title>Backup - Wellmax</title>
      </Head>
      <Navbar />
      <ScreenView justify='center'>
        <Container size='small'>
          {showMnemonic ? (
            showValidateMnemonic ? (
              <>
                <Heading as='h2'>Revisémoslo nuevamente</Heading>
                <Divider y={8} />
                <Text size='size'>
                  Escribe tu frase semilla en el orden en que estaban anteriormente para validar que lo has hecho bien
                  :)
                </Text>
              </>
            ) : (
              <>
                <Heading as='h2'>Key Phrase</Heading>
                <Divider y={8} />
                <Text size='large'>
                  It is very important that you save this seed phrase. It is the main key to be able to claim your assets in any non-custodial wallet.
                </Text>
              </>
            )
          ) : (
            <>
              <Heading>Not your keys, not your coins</Heading>
              <Divider y={8} />
              <Text size='large'>
                We help you receive payments or credits from anywhere in the world, but in reality you are the owner of the assets.
              </Text>
            </>
          )}

          {showMnemonic && showValidateMnemonic && (
            <>
              <Divider y={16} />
              <Mnemonic mnemonic={localMnemonic} handleChange={handleChangeMnemonic} readOnly={false} />
            </>
          )}
          {showMnemonic && !showValidateMnemonic && (
            <>
              <Divider y={16} />
              <Mnemonic mnemonic={localMnemonic} readOnly={true} />
              <Checkbox
                size='lg'
                width='100%'
                justifyContent='space-between'
                color='#fff'
                bg='#1F1F1F'
                p='20px'
                borderRadius='4px'
                onChange={() => setHasSave(!hasSave)}
              >
                I confirm I have written it down
              </Checkbox>
            </>
          )}
        </Container>
      </ScreenView>
      <Flex background='gray5'>
        <Container>
          <Divider y={16} />
          <Flex direction={{ base: 'column-reverse', md: 'row' }} justify={'center'} gap={8}>
            <Link href='/dashboard' type='bezeledGray' passHref>
              Go back
            </Link>
            {!showMnemonic && <Button onClick={handleShowMnemonic}>Continue</Button>}
            {showMnemonic && !showValidateMnemonic && (
              <Button isDisabled={!hasSave} onClick={handleConfirmSaveMnemonic}>
                Continue
              </Button>
            )}
            {showMnemonic && showValidateMnemonic && (
              <Button brand='secondary' onClick={() => handleSubmit(localMnemonic)}>
                Confirm
              </Button>
            )}
          </Flex>
          <Divider y={16} />
        </Container>
      </Flex>

      <Modal type='backup' isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Backup;
