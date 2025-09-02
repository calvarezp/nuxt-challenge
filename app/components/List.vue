<template>
  <div>
    <button
        @click="openModal"
        :disabled="counters.length >= 20"
        :title="counters.length >= 20 ? 'El máximo de contadores es 20' : ''"
    >
      Agregar contador
    </button>
    <p v-if="counters.length === 0">
      No hay contadores disponibles.
    </p>
    <ul>
      <Counter
          v-for="(counter, index) in counters"
          :key="index"
          :counter="counter"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import Counter from "~/components/Counter.vue";
import {ref} from "vue";

const { $store } = useNuxtApp();
const counters = ref<Counter[]>([]);

const originalCounters = computed(() => {
  return $store.state.counters;
});

const filteredCounters = computed(() => {
  return $store.state.filteredCounters;
});

watch(originalCounters, (value) => {
  if (filteredCounters.value.length > 0) {
    value = filteredCounters.value;
  }
  counters.value = value;
}, { immediate: true });

watch(filteredCounters, (value) => {
  value = originalCounters.value;
  if (filteredCounters.value.length > 0) {
    value = filteredCounters.value;
  }
  counters.value = value;
}, { immediate: true });

function openModal() {
  $store.commit('openModal');
}
</script>