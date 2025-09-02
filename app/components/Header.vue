<template>
  <header>
    <select @change="order">
      <option value="null">Ordenar:</option>
      <option value="name-asc">Nombre ascendente</option>
      <option value="name-desc">Nombre descendente</option>
      <option value="value-asc">Valor ascendente</option>
      <option value="value-desc">Valor descendente</option>
    </select>
    <button
        @click="openModal"
        :disabled="counters.length >= 20"
        :title="counters.length >= 20 ? 'El máximo de contadores es 20' : ''"
    >
      Agregar contador
    </button>
  </header>
</template>

<script setup lang="ts">
import {orderCounters} from "~/architecture/aplication/services/counters";

const { $store } = useNuxtApp();

const counters = computed(() => {
  return $store.state.counters;
});

function openModal() {
  $store.commit('openModal');
}

function order(event: Event) {
  const value = (event.target as HTMLSelectElement).value
  if (value === 'null') {
    return;
  }

  const ordered = orderCounters(counters.value, value);
  $store.commit('setCounters', ordered);
}
</script>
