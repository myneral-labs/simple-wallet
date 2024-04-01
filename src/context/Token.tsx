// @ts-nocheck
import React, { createContext, useContext, useState, useEffect } from 'react';
import { BigNumber, ethers } from 'ethers';
import { useToast } from '@chakra-ui/react';

import { useBlockchain } from './Blockchain';
import { useAccount } from './Account';

import abiDAI from '../utils/abi/DAI.json';

type TokenName = 'eth' | 'dai' | 'ghc';
interface TokenContextInterface {
  tokens: {
    eth: BigNumber;
    dai: BigNumber;
    ghc: BigNumber;
  };
  sendTransaction: (address: string, mount: number, token: TokenName) => null;
  transactionHistory: any[];
}

const TokenContext = createContext<TokenContextInterface | null>(null);

// Mainnet
// const addressDAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F';

// Test
const addressDAI = '0x2ff450d05774e99bf1525ffc18bb12772dea5ed3';

export function TokenWrapper({ children }) {
  // Chakra
  const toast = useToast();

  // Context
  const { myneralProvider } = useBlockchain();
  const { wallet, signer } = useAccount();

  // Component
  const [tokenETH, setTokenETH] = useState(ethers.constants.Zero);
  const [tokenDAI, setTokenDAI] = useState(ethers.constants.Zero);
  const [tokenGHC, setTokenGHC] = useState(ethers.constants.Zero);
  const [blockDebouncer, setBlockDebouncer] = useState(6);
  const [transactionHistory, setTransactionHistory] = useState([]); // New state for the transaction history

  const providerDAI = new ethers.Contract(addressDAI, abiDAI, myneralProvider);

    // Fetch transaction history
    const fetchTransactionHistory = async () => {
      if (wallet?.address?.eth) {
        const response = await fetch(`https://explorer.myneral.com/api/accounts/${wallet.address.eth}/transactions`);
        const data = await response.json();
        setTransactionHistory(data.data);
        // Reset the counter after fetching transaction history
        setBlockDebouncer(0);
      }
    };
  
  // Get Eth balance, as well as txHistory. dai temp disable
  if (!!wallet?.address?.eth) {
    myneralProvider?.on('block', () => {
      // Increment the counter on each block
      setBlockDebouncer((prevCounter) => prevCounter + 1);
      if (tokenETH?.isZero()) { //if (tokenETH?.isZero() && tokenDAI?.isZero()) {
        myneralProvider.getBalance(wallet?.address?.eth).then((balance) => {
          if (!balance?.eq(tokenETH)) {
            setTokenETH(balance);
          }
        });

        // providerDAI.balanceOf(wallet?.address?.eth).then((balance) => {
        //   if (!balance?.eq(tokenDAI)) {
        //     setTokenDAI(balance);
        //   }
        // });
      }
      if ( blockDebouncer % 6 === 0) {
        fetchTransactionHistory();
      }
    });
  }

  // Send transaccion
  const sendTransaction = async (toAddress, mount, token) => {
    const addressIsValid = ethers.utils.isAddress(toAddress);
    if (addressIsValid) {
      // Send token DAI
      if (token === 'dai') {
        const daiWithSigner = providerDAI.connect(signer);
        const dai = ethers.utils.parseUnits(String(mount), 18);

        try {
          await daiWithSigner.transfer(toAddress, dai);
          return {
            success: true,
          };
        } catch (error) {
          return {
            success: false,
            error,
          };
        }
      } else {
        // Send token ETH
        const tx = {
          to: toAddress,
          value: ethers.utils.parseUnits(String(mount.toFixed(18))),
        };

        try {
          await signer.signTransaction(tx);
          const { hash } = await signer.sendTransaction(tx);
          console.log('hash', hash);

          return {
            success: true,
            error: null,
          };
        } catch (error) {
          return {
            success: false,
            error,
          };
        }
      }
    } else {
      toast({
        description: 'The address appears to be incorrect.',
        status: 'warning',
      });

      return {
        success: false,
        error: null,
      };
    }
  };

  return (
    <TokenContext.Provider value={{ tokens: { eth: tokenETH, dai: tokenDAI, ghc: tokenGHC }, sendTransaction, transactionHistory }}>
      {children}
    </TokenContext.Provider>
  );
}

export function useToken() {
  return useContext(TokenContext);
}
