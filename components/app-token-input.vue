<template>  
  <v-autocomplete
    ref="autocomplete"
    :model-value="modelValue"
    :items="tokens"
    item-title="Token"
    :custom-filter="tokenFilter"
    chips
    clear-on-select
    @click="clearOnFocus"
    @update:model-value="unFocus"
  >
    <template #chip="{ props, item }">
      <v-chip
        v-bind="props"
        :prepend-avatar="item.raw.logoUrl"
        :text="item.raw.name"
        size="x-large"
      />
    </template>

    <template #item="{ props, item }">
      <v-list-item
        v-bind="props"
        :title="item.raw.name"
      >
        <template #prepend>
          <img 
            class="token-logo"
            :src="item.raw.logoUrl"
            :alt="item.raw.name"
            width="35px"
          >
        </template>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
import type { IToken } from '~/models/token.model';

defineProps({
  tokens: {
    type: Array<IToken>,
    required: true,
    default: []
  },
  modelValue: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(["update:modelValue"])

const selectedToken = defineModel({ type: Object });

function clearOnFocus(): void {
  selectedToken.value = null;
}

function unFocus(event: any): void {
  emit("update:modelValue", event)
  const element = document.activeElement as HTMLElement;
  element.blur();
}

function tokenFilter(itemTitle: string, queryText: string, item: any): boolean {
  const token: IToken = item.raw;
  return token.name.toLowerCase().indexOf(queryText.toLowerCase()) > -1 ||
    token.symbol.toLowerCase().indexOf(queryText.toLowerCase()) > -1 ||
    token.contract.toLowerCase().indexOf(queryText.toLowerCase()) > -1
}

</script>

<style lang="scss">
.token-logo {
  padding-right: 10px;
}

.v-field .v-chip {
  --v-chip-height: 62px !important; 
  width: 100%;
  display: flex;
  justify-content: center;
}

.v-autocomplete .v-field--dirty .v-autocomplete__selection {
  width: 100%;
}

.v-autocomplete .v-field .v-field__input {
  height: 80px;
}

.v-chip__close {
  margin-left: auto !important;
  margin-right: 0.5em !important;
}

.v-chip__prepend {
  margin-left: 0.5em;
}
</style>