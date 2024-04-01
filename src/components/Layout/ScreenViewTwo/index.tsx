import { Flex } from '@chakra-ui/react';

const Component = (props) => {
  return <Flex width={'100%'} height={'100%'} flexDirection={'column'} overflowY={'auto'} {...props} />;
};

export default Component;
