<template>
  <NuxtLayout>
    <NuxtPage /> 
  </NuxtLayout>
</template>

<script setup lang="ts">
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi'
import { bsc, bscTestnet } from 'viem/chains'
import { reconnect } from '@wagmi/core'

 // 1. Define constants
 const projectId = 'b7234ee880f91dcffd7229b192a94c55'

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Connect your wallet',
  url: 'https://app.muneys.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const tokens: any = {
  1: {
    address: "0x74c57783b980a44efa4741ba863a71aded83f71c",
    image: "https://muneys.com/wp-content/uploads/2024/03/cropped-cropped-OIG2-photoaidcom-cropped-150x150.png"
  },
  2: {
    address: "0xe93365962fF59a26892CE3521eE3823Fa707Bc9C",
    image: "https://muneys.com/wp-content/uploads/2024/03/cropped-cropped-OIG2-photoaidcom-cropped-150x150.png"
  }
}

const chains: any = [bsc, bscTestnet]
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
  enableOnramp: true, // Optional - false as default,
  themeMode: 'dark',
  tokens
})
</script>
