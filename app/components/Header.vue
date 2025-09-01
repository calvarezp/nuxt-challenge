<template>
  <header>
    <button
        @click="openModal"
        :disabled="counters.length >= 20"
        :title="counters.length >= 20 ? 'El máximo de contadores es 20' : ''"
    >
      Agregar contador
    </button>
  </header>
</template>

<script setup>
const { $store } = useNuxtApp();

const counters = computed(() => {
  return $store.state.counters;
});

function openModal() {
  $store.dispatch('openModal')
}
</script>
