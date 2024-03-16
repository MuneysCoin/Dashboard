<template>
  <v-card
    variant="flat"
    class="d-flex justify-center align-center flex-column"
  >
    <span>Please connect your wallet</span>
    <w3m-connect-button
      class="wallet-button"
    />
  </v-card>
</template>

<style lang="scss">
.wallet-button {
  padding: 1em;
}
</style>