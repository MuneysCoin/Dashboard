<template>  
  <v-autocomplete
    :label="label"
    :items="tokens"
    item-title="Token"
  >
    <template #item="{ props, item }">
      <v-list-item
        v-bind="props"
        :title="item.raw.name"
      >
        <template #prepend>
          <v-avatar 
            :src="item.raw.logoUrl"
            :alt="item.raw.name"
          />
        </template>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
import type { IToken } from '~/models/token.model';

defineProps<{
  tokens: IToken[]
  label: string
}>()

</script>