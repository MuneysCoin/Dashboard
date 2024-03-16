import type { ISwapPriceResponse, ISwapQuoteResponse } from "~/models/swap-price.response";
import type { ContractString } from "~/types/web3.types";

const baseUrl = "https://bsc.api.0x.org";

export async function getSwapPrice(sellToken: ContractString, buyToken: ContractString, sellAmount: bigint, takerAddress: ContractString, apiKey: string): Promise<ISwapPriceResponse> {
  const params = new URLSearchParams({
    sellToken,
    buyToken,
    sellAmount: sellAmount.toString(),
    takerAddress
  });

  const apiPath = `/swap/v1/price?${params.toString()}`;
  const req = new URL(apiPath, baseUrl).href

  return await $fetch(req, {
    method: "GET",
    headers: {
      "0x-api-key": apiKey
    }
  });
}

export async function executeSwap(sellToken: ContractString, buyToken: ContractString, sellAmount: bigint, takerAddress: ContractString, apiKey: string): Promise<ISwapQuoteResponse> {
  const params = new URLSearchParams({
    sellToken,
    buyToken,
    sellAmount: sellAmount.toString(),
    takerAddress
  });

  const apiPath = `/swap/v1/quote?${params.toString()}`;
  const req = new URL(apiPath, baseUrl).href

  return await $fetch(req, {
    method: "GET",
    headers: {
      "0x-api-key": apiKey
    }
  });
}

export function tokenWithDecimals(value: number, decimals: number): bigint {
  return BigInt(Math.floor(value * (10 ** decimals)));
}