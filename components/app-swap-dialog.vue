<template>
  <v-dialog
    :model-value="dialog"
    width="auto"
  >
    <v-card
      max-width="400"
      :prepend-icon="icon"
      :text="text"
      :title="title"
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
  text: string,
  title: string,
  icon: string
}>();

function close(): void {
  emit("update:dialog", false)
}
</script>