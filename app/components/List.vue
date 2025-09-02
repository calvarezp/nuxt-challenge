<template>
  <div>
    <p v-if="counters.length === 0">
      No hay contadores disponibles.
    </p>
    <ul>
      <Counter
          v-for="(item, index) in counters"
          :key="index"
          :item="item"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import Counter from "~/components/Counter.vue";

const { $store } = useNuxtApp();
const counters = computed(() => {
  return $store.state.counters;
});
</script>