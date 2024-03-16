<template>
  <v-navigation-drawer mobile-breakpoint="md">
    <v-list>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        link
        to="/"
        title="Dashboard"
      />
      <v-list-item
        prepend-icon="mdi-swap-horizontal-bold"
        link
        to="/swap"
        title="Swapping"
      />
      <v-list-item
        prepend-icon="mdi-chart-box-multiple-outline"
        link
        to="stats"
        title="Statistics"
      />
    </v-list>
  </v-navigation-drawer>
  <v-navigation-drawer
    v-model="app.drawer"
    absolute
    temporary
    class="hidden-md-and-up"
  >
    <v-list
      nav
      dense
    >
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        link
        to="/"
        title="Dashboard"
      />
      <v-list-item
        prepend-icon="mdi-swap-horizontal-bold"
        link
        to="/swap"
        title="Swapping"
      />
      <v-list-item
        prepend-icon="mdi-chart-box-multiple-outline"
        link
        to="stats"
        title="Statistics"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useAppStore } from '../stores/app';

const app = useAppStore()
</script>