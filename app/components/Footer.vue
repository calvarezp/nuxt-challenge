<template>
  <footer>
    Total de contadores: {{ counters.length }}
  </footer>
</template>

<script setup>
const { $store } = useNuxtApp();
const counters = computed(() => $store.state.counters);
</script>