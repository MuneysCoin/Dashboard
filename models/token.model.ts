import type { ContractString } from "~/types/web3.types";

export interface IToken {
  contract: ContractString;
  symbol: string;
  name: string;
  logoUrl: string;
  decimals: number;
  amount?: number;
  pricePerToken?: number;
}