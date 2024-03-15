<template>
  <v-card 
    class="swapping-card w-100" 
    variant="flat"
  >
    <div class="title-row d-flex justify-center align-center">
      <v-card-title>Muneys Swap</v-card-title>
    </div>
    <div class="input-row d-flex justify-center">
      <v-autocomplete
        label="To"
        :items="tokensList"
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
      <v-autocomplete
        label="To"
        :items="tokensList"
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

interface IToken {
  id: string;
  symbol: string;
  name: string;
  platforms: any[]
}

const tokensData: IToken[]  = await $fetch("https://api.coingecko.com/api/v3/coins/list?include_platform=true", {
  method: "GET"
});

const tokens: IToken[] = tokensData.filter(token => Object.keys(token.platforms)[0] === "binance-smart-chain");
const tokensList: string[] = tokens.map(token => token.name)

</script>

<style lang="scss">
.swapping-card {
  width: 35rem;
  padding: 3rem;
  border-radius: 5px;
  background: rgb(var(--v-theme-surface));

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