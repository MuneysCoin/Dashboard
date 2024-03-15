<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app-bar title="Muneys App">
    <w3m-button />
    <v-app-bar-nav-icon
      class="d-flex d-md-none" 
      @click="app.toggleDrawer()"
    />
  </v-app-bar>
</template>

<script setup lang="ts">
import { useAppStore } from '../stores/app';
const app = useAppStore()

</script>

<style lang="scss">
.wallet-avatar {
  cursor: pointer;
}

</style>