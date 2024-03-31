// @ts-nocheck
import React, { createContext, useContext, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import { useToast } from '@chakra-ui/react';

import { useBlockchain } from './Blockchain';
import { useAccount } from './Account';

import abiDAI from '../utils/abi/DAI.json';

type TokenName = 'eth' | 'dai';
interface TokenContextInterface {
  tokens: {
    eth: BigNumber;
    dai: BigNumber;
  };
  sendTransaction: (address: string, mount: number, token: TokenName) => null;
}

const TokenContext = createContext<TokenContextInterface | null>(null);

// Mainnet
// const addressDAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F';

// Test
const addressDAI = '0x68194a729c2450ad26072b3d33adacbcef39d574';

export function TokenWrapper({ children }) {
  // Chakra
  const toast = useToast();

  // Context
  const { myneralProvider } = useBlockchain();
  const { wallet, signer } = useAccount();

  // Component
  const [tokenETH, setTokenETH] = useState(ethers.constants.Zero);
  const [tokenDAI, setTokenDAI] = useState(ethers.constants.Zero);

  const providerDAI = new ethers.Contract(addressDAI, abiDAI, myneralProvider);

  // Obtener balance de Ethereum y DAI
  if (!!wallet?.address?.eth) {
    myneralProvider?.on('block', () => {
      if (tokenETH?.isZero() && tokenDAI?.isZero()) {
        myneralProvider.getBalance(wallet?.address?.eth).then((balance) => {
          if (!balance?.eq(tokenETH)) {
            setTokenETH(balance);
          }
        });

        providerDAI.balanceOf(wallet?.address?.eth).then((balance) => {
          if (!balance?.eq(tokenDAI)) {
            setTokenDAI(balance);
          }
        });
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
    <TokenContext.Provider value={{ tokens: { eth: tokenETH, dai: tokenDAI }, sendTransaction }}>
      {children}
    </TokenContext.Provider>
  );
}

export function useToken() {
  return useContext(TokenContext);
}
