<template>
  <v-layout class="rounded rounded-md">
    <AppHeader />
    <AppSidebar />

    <v-main
      class="d-flex align-center justify-center"
      style="min-height: 300px;"
    >
      <slot />
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { useWeb3Store } from '#imports'; 

const web3 = useWeb3Store()

onMounted(() => {
  web3.connect();
})

</script>
