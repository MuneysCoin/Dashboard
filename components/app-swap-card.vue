<template>
  <v-card 
    class="swapping-card w-100" 
    variant="flat"
  >
    <v-form
      v-model="swapForm"
      @submit="swapSubmit"
    >
      <div class="title-row d-flex justify-center align-center">
        <v-card-title>Muneys Swap</v-card-title>
      </div>
      <div class="d-flex justify-center align-center w-100">
        <div class="input-col d-flex justify-center">
          <span class="label">From</span>
        </div>
        <div class="input-col d-flex flex-column w-100">
          <div class="input-row">
            <AppTokenInput
              ref="inputOne"
              v-model="fromToken"
              :tokens="tokens"
              :disabled="loading"
              @update:model-value="updateTokenPrices"
            />
          </div>
          <div class="input-row">
            <v-text-field
              v-model="fromAmount"
              label="Amount"
              type="number"
              :rules="amountRules"
              :disabled="loading"
              @update:model-value="getPriceFrom"
            />
          </div>
          <span v-if="fromAmount">USD: {{ usdPrices.from * fromAmount }}</span>
        </div>
      </div>

      <div class="d-flex align-center justify-center swapp-icon-row">
        <v-btn
          @click="switchFromTo"
        >
          <v-icon 
            icon="mdi-arrow-down-bold" 
            size="x-large"
          />
        </v-btn>
      </div>
      <div class="d-flex justify-center align-center w-100">
        <div class="input-col d-flex justify-center">
          <span class="label">To</span>
        </div>
        <div class="input-col d-flex flex-column w-100">
          <div class="input-row">
            <AppTokenInput
              ref="inputOne"
              v-model="toToken"
              :tokens="tokens"
              :disabled="loading"
              @update:model-value="updateTokenPrices"
            />
          </div>
          <div class="input-row">
            <v-text-field
              v-model="toAmount"
              label="Amount"
              type="number"
              :rules="amountRules"
              :disabled="loading"
              @update:model-value="getPriceTo"
            />
          </div>
        </div>
      </div>
    </v-form>

    <v-card-actions class="button-row d-flex justify-center align-center">
      <v-btn
        v-if="!loading && allowanceSet"
        size="large" 
        variant="elevated"
        color="blue"
        @click="swapSubmit"
      >
        Swap
      </v-btn>
      <v-btn 
        v-else-if="!loading"
        size="large" 
        variant="elevated"
        color="blue"
        @click="setAllowance"
      >
        Approve Swap
      </v-btn>
      <v-progress-circular
        v-if="loading"
        :size="50"
        color="primary"
        indeterminate
      />
    </v-card-actions>
  </v-card>
  <AppSwapDialog 
    :dialog="success" 
    :text="`Swapped ${finishedSwap.fromTokenAmount} (${finishedSwap.fromTokenName}) for ${finishedSwap.toTokenAmount} (${finishedSwap.toTokenName})`"
    icon="mdi-check"
    title="Successfully swapped!"
    @update:dialog="success = false"
  />
  <AppSwapDialog 
    :dialog="failure" 
    :text="`Swap failed. Please try again.`"
    icon="mdi-alert-circle-outline"
    title="Swap failed!"
    @update:dialog="failure = false"
  />
</template>

<script setup lang="ts">
import { getAccount, readContract, sendTransaction, waitForTransactionReceipt, writeContract } from '@wagmi/core';
import { erc20Abi } from 'viem';
import { config } from '~/configs/wagmi.config';
import type { ISwapPriceResponse, ISwapQuoteResponse } from '~/models/swap-price.response';
import type { IToken } from '~/models/token.model';

const runtimeConfig = useRuntimeConfig();
const apiKeySwapping = runtimeConfig.public.apiKeySwapping;

const loading = ref(false);
const allowanceSet = ref(false);
const success = ref(false);
const failure = ref(false);
const finishedSwap = ref({
  fromTokenName: "",
  fromTokenAmount: 0,
  toTokenName: "",
  toTokenAmount: 0
});

const usdPrices = ref({
  from: 0
})

const exchangeProxy = "0xdef1c0ded9bec7f1a1670819833240f027b25eff"; // https://0x.org/docs/introduction/0x-cheat-sheet#exchange-proxy-addresses
const swap = useSwapStore();

const tokens: IToken[] = [
  {
    contract: "0x74c57783b980a44efa4741ba863a71aded83f71c",
    symbol: "MUNEYS",
    name: "MUNEYS",
    logoUrl: "https://muneys.com/wp-content/uploads/2024/03/cropped-cropped-OIG2-photoaidcom-cropped-150x150.png",
    decimals: 9
  }, 
  {
    contract: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
    symbol: "WBNB",
    name: "Wrapped BNB",
    logoUrl: "https://bscscan.com/token/images/bnbchain2_32.png",
    decimals: 18
  }, {
  contract: "0x55d398326f99059fF775485246999027B3197955",
  symbol: "BSC-USD",
  name: "USDT",
  logoUrl: "https://etherscan.io/token/images/tethernew_32.png",
  decimals: 18
}];

const fromToken = ref<IToken>(tokens[1])
const toToken = ref<IToken>(tokens[0])

const fromAmount = ref<number>();
const toAmount = ref<number>()

let lastPrice: ISwapPriceResponse;

const swapForm = false;

let timer: NodeJS.Timeout;

const account = getAccount(config);

const amountRules = [
  (value: string) => {
    if (value) return true
    return "Amount is required"
  }
];

function switchFromTo(): void {
  const oldToToken = toToken.value;
  const oldAmountTo = toAmount.value;

  toToken.value = fromToken.value;
  toAmount.value = fromAmount.value;

  fromAmount.value = oldAmountTo;
  fromToken.value = oldToToken;
  updateTokenPrices();
}

async function updateTokenPrices(): Promise<void> {
  const reqFrom = `https://api.geckoterminal.com/api/v2/simple/networks/bsc/token_price/${fromToken.value.contract}`;
  const resFrom: any = await $fetch(reqFrom, { method: "GET" });
  usdPrices.value.from = resFrom.data.attributes.token_prices[fromToken.value.contract];
}

async function getPriceFrom(): Promise<void> {

  clearTimeout(timer)
  timer = setTimeout(async () => {
    if (fromAmount.value && fromAmount.value > 0) {
      try {
        loading.value = true;
        const calcFromAmount = Math.floor(fromAmount.value * (10 ** fromToken.value.decimals))
        const req = `https://bsc.api.0x.org/swap/v1/price?sellToken=${fromToken.value.contract}&buyToken=${toToken.value.contract}&sellAmount=${calcFromAmount}&takerAddress=${account.address}`
        const price: ISwapPriceResponse = await $fetch(req, {
          method: "GET",
          headers: {
            "0x-api-key": apiKeySwapping!
          }
        });

        lastPrice = price;
        toAmount.value = Number(price.buyAmount) / (10 ** toToken.value.decimals);
        loading.value = false;
        await updateTokenPrices();

      } catch (err: any) {
        loading.value = false;
      }
    } 
  }, 500);
}

async function getPriceTo(): Promise<void> {
  clearTimeout(timer)
  timer = setTimeout(async () => {
    if (toAmount.value && toAmount.value > 0) {
      try {
        loading.value = true;
        const calcToAmount = Math.floor(toAmount.value * (10 ** toToken.value.decimals))
        const req = `https://bsc.api.0x.org/swap/v1/price?sellToken=${fromToken.value.contract}&buyToken=${toToken.value.contract}&buyAmount=${calcToAmount}&takerAddress=${account.address}`
        const price: ISwapPriceResponse = await $fetch(req, {
          method: "GET",
          headers: {
            "0x-api-key": apiKeySwapping!
          }
        });

        lastPrice = price;
        fromAmount.value = Number(price.sellAmount) / (10 ** fromToken.value.decimals);
        loading.value = false;
        await updateTokenPrices();

      } catch (err: any) {
        loading.value = false;
      }
    }
  }, 500);
}

async function swapSubmit(): Promise<void> {
  loading.value = true;

  try {
    if (lastPrice.sellAmount && lastPrice.sellAmount > 0) {       
      const req = `https://bsc.api.0x.org/swap/v1/quote?sellToken=${fromToken.value.contract}&buyToken=${toToken.value.contract}&sellAmount=${lastPrice.sellAmount}&takerAddress=${account.address}&skipValidation=true`
      const quote: ISwapQuoteResponse = await $fetch(req, {
        method: "GET",
        headers: {
          "0x-api-key": apiKeySwapping!
        }
      });

      toAmount.value = Number(quote.buyAmount) / (10 ** toToken.value.decimals);

      const trans = await sendTransaction(config, quote)
      await waitForTransactionReceipt(config, {
        hash: trans
      })

      success.value = true;
    } 
  } catch (err: any) {
    failure.value = true;
  }
  loading.value = false;
}

async function setAllowance(): Promise<void> {
  loading.value = true

  const reqAllowance = lastPrice.sellAmount;

  const allowance = await readContract(
    config, {
      address: (fromToken.value.contract as any),
      abi: erc20Abi,
      functionName: "allowance",
      args: [ (account.address as any), exchangeProxy ]
    }
  );

  if (allowance < lastPrice.sellAmount || !allowance) {
    const trans = await writeContract(
      config, {
        address: (fromToken.value.contract as any),
        abi: erc20Abi,
        functionName: "approve",
        args: [ exchangeProxy, BigInt(reqAllowance) ]
    });

    waitForTransactionReceipt(config, {
      hash: trans
    })
    .then(data => {
      if (data.status == "success") {
        swap.setAllowance(fromToken.value);
        allowanceSet.value = true;
        loading.value = false;
      }
    }).catch(() => {
      loading.value = false;
    })
  } else {
    loading.value = false;
    allowanceSet.value = true;
  }
}
</script>

<style lang="scss">
.swapping-card {
  width: 35rem;
  padding: 3rem;
  border-radius: 5px;
  background: rgb(var(--v-theme-surface));

  @media screen and (max-width: 600px){
    width: 100%;
    padding: 0.5em;
  }

  .input-row {
    padding-top: 1em;
    padding-bottom: 1em;
  }

  .title-row {
    height: 5em;
  }
  
  .swapp-icon-row {
    height: 7rem;
  }

  .button-row {
    padding-top: 3em;
  }

  .label {
    width: 4em;
  }

  .v-input {
    display: flex;

    .v-input__control {
      width: 100%;
    }
  }
}
</style>