<template>
  <v-dialog
    :model-value="dialog"
    width="auto"
  >
    <v-card
      max-width="400"
      prepend-icon="mdi-check"
      :text="`You swapped ${finishedSwap.fromTokenAmount} (${finishedSwap.fromTokenName}) for ${finishedSwap.toTokenAmount} (${finishedSwap.toTokenName})`"
      :title="`Successfully swapped!`"
    >
      <template #actions>
        <v-btn
          class="ms-auto"
          text="Ok"
          @click="close"
        />
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:dialog"])

defineProps<{
  dialog: boolean,
  finishedSwap: {
    fromTokenName: string,
    fromTokenAmount: number,
    toTokenName: string,
    toTokenAmount: number
  }
}>();

function close(): void {
  emit("update:dialog", false)
}
</script>