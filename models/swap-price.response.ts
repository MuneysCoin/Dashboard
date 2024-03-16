export interface ISwapPriceResponse {
  buyAmount: number;
  sellAmount: number;
  estimatedGas: number;
}

export interface ISwapQuoteResponse {
  chainId: number;
  price: number;
  to: `0x${string}`;
  value: bigint;
  gasPrice: bigint;
  guaranteedPrice: number;
  estimatedPriceImpact: number;
  data: `0x${string}`;
  gas: bigint;
  estimatedGas: number;
  protocolFee: number;
  minimumProtocolFee: number;
  buyTokenAddress: `0x${string}`;
  sellTokenAddress: `0x${string}`;
  buyAmount: number;
  sellAmount: number;
  sources: {
    name: string
    proportion: number
  }[],
  orders: {
    makerToken: `0x${string}`;
    takerToken: `0x${string}`;
    makerAmount: number;
    takerAmount: number;
    fillData: {
      tokenAddressPath: `0x${string}`[],
      router: `0x${string}`;
    },
    source: string;
    sourcePathId: `0x${string}`;
    type: number;
  }[],
  allowanceTarget: `0x${string}`;
  sellTokenToEthRate: number;
  buyTokenToEthRate: number;
  fees: {
    zeroExFee?: number;
  },
  grossPrice: number;
  grossBuyAmount: number;
  grossSellAmount: number;
}