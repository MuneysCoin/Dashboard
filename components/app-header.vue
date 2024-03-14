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
import { useWeb3Modal } from '@web3modal/wagmi/vue'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi'

import { bsc } from 'viem/chains'
import { reconnect } from '@wagmi/core'

const app = useAppStore()

// 1. Define constants
const projectId = 'b7234ee880f91dcffd7229b192a94c55'

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Connect your wallet',
  url: 'https://app.muneys.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const tokens = {
  1: {
    address: "0x74c57783b980a44efa4741ba863a71aded83f71c",
    image: "https://muneys.com/wp-content/uploads/2024/03/cropped-cropped-OIG2-photoaidcom-cropped-150x150.png"
  }
}

const chains = [bsc]
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  tokens
})

if (process.client) {
  reconnect(config)
}

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default,
  themeMode: 'dark'
})

// const modal = useWeb3Modal()


</script>

<style lang="scss">
.wallet-avatar {
  cursor: pointer;
}

</style>