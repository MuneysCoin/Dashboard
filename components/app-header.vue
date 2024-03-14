<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app-bar title="Muneys App">
    <v-app-bar-nav-icon
      class="d-flex d-md-none" 
      @click="app.toggleDrawer()"
    />
    <template #prepend />
  </v-app-bar>
</template>

<script setup lang="ts">
import { useAppStore } from '~/stores/app';

const app = useAppStore()



</script>