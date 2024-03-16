<template>
  <NuxtLayout>
    <NuxtPage /> 
  </NuxtLayout>
</template>

<script setup lang="ts">
import { createWeb3Modal } from '@web3modal/wagmi'
import { reconnect } from '@wagmi/core'
import { config, projectId } from '~/configs/wagmi.config'

reconnect(config)

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


// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId: projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default,
  themeMode: 'dark',
  tokens
})
</script>
