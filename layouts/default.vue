<template>
  <v-layout class="d-flex rounded rounded-md">
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

</script>
