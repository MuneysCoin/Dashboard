<template>
  <v-card 
    class="swapping-card w-100" 
    variant="flat"
  >
    <div class="title-row d-flex justify-center align-center">
      <v-card-title>Muneys Swap</v-card-title>
    </div>
    <div class="input-row d-flex justify-center">
      <AppTokenInput
        ref="inputOne"
        :tokens="tokens"
      />
    </div>
    <div class="d-flex align-center justify-center swapp-icon-row">
      <v-btn>
        <v-icon 
          icon="mdi-swap-vertical-bold" 
          size="x-large"
        />
      </v-btn>
    </div>
    <div class="input-row d-flex justify-center">
      <AppTokenInput
        ref="inputTwo"
        :tokens="tokens"
      />
    </div>
    <v-card-actions class="button-row d-flex justify-center align-center">
      <v-btn>
        Swap
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { IToken } from '~/models/token.model';

const tokens: IToken[] = [
  {
    contract: "0x74c57783b980a44efa4741ba863a71aded83f71c",
    symbol: "MUNEYS",
    name: "MUNEYS",
    logoUrl: "https://muneys.com/wp-content/uploads/2024/03/cropped-cropped-OIG2-photoaidcom-cropped-150x150.png"
  }, 
  {
    contract: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
    symbol: "WBNB",
    name: "BNB",
    logoUrl: "https://bscscan.com/token/images/bnbchain2_32.png"
  }, {
  contract: "0x55d398326f99059fF775485246999027B3197955",
  symbol: "BSC-USD",
  name: "USDT",
  logoUrl: "https://etherscan.io/token/images/tethernew_32.png"
}];

</script>

<style lang="scss">
.swapping-card {
  width: 35rem;
  padding: 3rem;
  border-radius: 5px;
  background: rgb(var(--v-theme-surface));

  @media screen and (max-width: 620px){
    width: 100%;
  }

  .title-row {
    height: 5em;
  }
  
  .swapp-icon-row {
    height: 7rem;
  }

  .button-row {
    min-height: 3em;
  }
}
</style>