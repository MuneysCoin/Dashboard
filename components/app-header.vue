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
import { useAppStore } from '~/stores/app';
import { useWeb3Modal } from '@web3modal/wagmi/vue'

const app = useAppStore()


import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi'

import { mainnet, arbitrum } from 'viem/chains'
import { reconnect } from '@wagmi/core'

// 1. Define constants
const projectId = 'b7234ee880f91dcffd7229b192a94c55'

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://app.muneys.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, arbitrum]
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata
})

reconnect(config)
// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true // Optional - false as default
})

const modal = useWeb3Modal()

</script>

<style lang="scss">
.wallet-avatar {
  cursor: pointer;
}

</style>