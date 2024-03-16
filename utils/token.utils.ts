import type { ContractString } from "~/types/web3.types";

const baseUrl = "https://api.geckoterminal.com";

export async function getTokenPrice(network: string, contract: ContractString): Promise<number> {
  const apiPath = `/api/v2/simple/networks/${network}/token_price/${contract}`;
  const req = new URL(apiPath, baseUrl).href

  const res: any = await $fetch(req, { 
    method: "GET",
    headers: {

    }
  });
  return res.data.attributes.token_prices[contract.toLowerCase()];
}