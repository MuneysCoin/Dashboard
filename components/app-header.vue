<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app-bar title="Muneys App">
    <v-avatar 
      class="wallet-avatar"
      icon="$vuetify" 
      color="green"
      @click="modal.open()"
    />
    <v-app-bar-nav-icon
      class="d-flex d-md-none" 
      @click="app.toggleDrawer()"
    />
  </v-app-bar>
</template>

<script setup lang="ts">
import { useAppStore } from '../stores/app';

const app = useAppStore()
import { useWeb3Modal } from '@web3modal/wagmi/vue'

// const modal = useWeb3Modal()

</script>

<style lang="scss">
.wallet-avatar {
  cursor: pointer;
}

</style>