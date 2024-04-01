import { Flex, ModalContent, ModalBody } from '@chakra-ui/react';

import Link from 'src/components/Shared/Link';
import Text from 'src/components/Shared/Text';
import Heading from 'src/components/Shared/Heading';

const Backup = () => {
  return (
    <ModalContent bg='#111'>
      <ModalBody p='40px 20px' display='flex' w='100%' flexDirection='column' alignItems='initial' gap='20px'>
        <Flex flex='1' flexDirection='column' gap='20px' justifyContent='center' mb='20px'>
          <Flex flexDirection='column' alignItems='center' gap='20px' textAlign='center'>
            <Heading as='h2'>Congratulations!</Heading>
            <Text opacity='.65'>
              Make sure to save your seed phrase well, it's the only way to recover your funds.
            </Text>
          </Flex>
        </Flex>
        <Link href='/dashboard' isBlock>
          Go to home
        </Link>
      </ModalBody>
    </ModalContent>
  );
};

export default Backup;
