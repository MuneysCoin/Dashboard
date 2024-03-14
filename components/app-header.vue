<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app-bar title="Muneys App">
    <v-avatar 
      class="wallet-avatar"
      icon="$vuetify" 
      color="green"
      @click="web3.connect()"
    />
    <v-app-bar-nav-icon
      class="d-flex d-md-none" 
      @click="app.toggleDrawer()"
    />
  </v-app-bar>
</template>

<script setup lang="ts">
import { useAppStore } from '~/stores/app';
import { useWeb3Store } from '#imports'; 

const app = useAppStore()
const web3 = useWeb3Store()

</script>

<style lang="scss">
.wallet-avatar {
  cursor: pointer;
}

</style>