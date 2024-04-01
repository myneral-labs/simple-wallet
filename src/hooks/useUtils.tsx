import { BigNumber, formatEther } from 'ethers';

export default function bigNumberTokenToString(bigNumber: BigNumber): string {
  return formatEther(bigNumber);
}
