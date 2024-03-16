import type { ContractString } from "~/types/web3.types";

export interface ISwapPriceResponse {
  buyAmount: number;
  sellAmount: number;
  estimatedGas: number;
}

export interface ISwapQuoteResponse {
  chainId: number;
  price: number;
  to: ContractString;
  value: bigint;
  gasPrice: bigint;
  guaranteedPrice: number;
  estimatedPriceImpact: number;
  data: ContractString;
  gas: bigint;
  estimatedGas: number;
  protocolFee: number;
  minimumProtocolFee: number;
  buyTokenAddress: ContractString;
  sellTokenAddress: ContractString;
  buyAmount: number;
  sellAmount: number;
  sources: {
    name: string
    proportion: number
  }[],
  orders: {
    makerToken: ContractString;
    takerToken: ContractString;
    makerAmount: number;
    takerAmount: number;
    fillData: {
      tokenAddressPath: ContractString[],
      router: ContractString;
    },
    source: string;
    sourcePathId: ContractString;
    type: number;
  }[],
  allowanceTarget: ContractString;
  sellTokenToEthRate: number;
  buyTokenToEthRate: number;
  fees: {
    zeroExFee?: number;
  },
  grossPrice: number;
  grossBuyAmount: number;
  grossSellAmount: number;
}