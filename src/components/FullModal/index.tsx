import { useEffect } from 'react';
import { VStack } from '@chakra-ui/react';

import useKeyPress from 'src/hooks/useKeyPress';

import Receive from './Receive';
import Send from './Send';
import NewLoan from './NewLoan';
import Transactions from './Transactions';

const Component = (props) => {
  const { open, onClose, type = null } = props;

  const escapePress = useKeyPress('Escape');

  useEffect(() => {
    if (escapePress) {
      onClose();
    }
  }, [escapePress]);

  const fullModalStyle = {
    bottom: '0',
    left: '0',
    zIndex: '10',
    display: open ? 'flex' : 'none',
    width: '100%',
    height: '100%',
    background: 'background',
  };

  const modalStyle = {
    width: '100%',
    height: '100%',
  };

  return (
    <VStack position='fixed' {...fullModalStyle}>
      {type && (
        <VStack {...modalStyle}>
          {type === 'receive' && <Receive onClose={onClose} />}
          {type === 'send' && <Send onClose={onClose} />}
          {type === 'newloan' && <NewLoan onClose={onClose} />}
          {type === 'transactions' && <Transactions onClose={onClose} />}
        </VStack>
      )}
    </VStack>
  );
};

export default Component;
