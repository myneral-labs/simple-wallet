// @ts-nocheck
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const BlockchainContext = createContext({ myneralProvider: () => null, getGasPrice: () => null });

export function BlockchainWrapper({ children }) {
  const [myneralProvider, setMyneralProvider] = useState();

  useEffect(() => {
    if (!myneralProvider) {
      // Mainnet: homestead
      // Testnet: goerli
      // const myneral = new ethers.providers.InfuraProvider('goerli', process.env.INFURA_TOKEN_API);
      const myneral = new ethers.providers.JsonRpcProvider(process.env.JSON_RPC_URL);
      setMyneralProvider(myneral);
    }
  }, [myneralProvider]);

  if (!myneralProvider) return;

  // Obtener precio del gas
  const getGasPrice = async () => {
    const gasPrice = await myneralProvider.getGasPrice();
    return ethers.utils.formatEther(gasPrice);
  };

  return <BlockchainContext.Provider value={{ myneralProvider, getGasPrice }}>{children}</BlockchainContext.Provider>;
}

export function useBlockchain() {
  return useContext(BlockchainContext);
}
