export interface IToken {
  contract: string;
  symbol: string;
  name: string;
  logoUrl: string;
  decimals: number;
  allowance?: bigint;
}