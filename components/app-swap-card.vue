<template>
  <v-card 
    class="swapping-card w-100" 
    variant="flat"
  >
    <div class="title-row d-flex justify-center align-center">
      <v-card-title>Muneys Swap</v-card-title>
    </div>
    <div class="input-row d-flex justify-center">
      <v-autocomplete
        label="To"
        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
      />
    </div>
    <div class="d-flex align-center justify-center swapp-icon-row">
      <v-btn>
        <v-icon 
          icon="mdi-swap-vertical-bold" 
          size="x-large"
        />
      </v-btn>
    </div>
    <div class="input-row d-flex justify-center">
      <v-autocomplete
        label="To"
        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
      />
    </div>
    <v-card-actions class="button-row d-flex justify-center align-center">
      <v-btn>
        Swap
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style lang="scss">
.swapping-card {
  width: 35rem;
  padding: 3rem;
  border-radius: 5px;
  background: rgb(var(--v-theme-surface));

  .title-row {
    height: 5em;
  }
  
  .swapp-icon-row {
    height: 7rem;
  }

  .button-row {
    min-height: 3em;
  }
}
</style>