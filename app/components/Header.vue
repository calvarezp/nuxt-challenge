<template>
  <header>
    <span>Ordenar: </span>
    <select @change="order">
      <option value="null">Seleccione</option>
      <option value="name-asc">Nombre ascendente</option>
      <option value="name-desc">Nombre descendente</option>
      <option value="value-asc">Valor ascendente</option>
      <option value="value-desc">Valor descendente</option>
    </select>
    <span>Filtrar: </span>
    <select v-model="filterType">
      <option value="null">Seleccione</option>
      <option value="greater-than">Valor mayor a</option>
      <option value="less-than">Valor menor a</option>
    </select>
    <input
        type="number"
        placeholder="Valor"
        v-model="filterValue"
        :disabled="filterType === 'null'"
    />

    <button
        @click="filter"
    >
      Filtrar
    </button>
    <button
        @click="reset"
    >
      Reiniciar
    </button>
    Buscar:
    <input
      type="text"
      placeholder="Nombre"
      v-model="finderValue"
    />
  </header>
</template>

<script setup lang="ts">
import {filterCounters, orderCounters} from "~/architecture/application/services/counters";
import {ref} from "vue";
import type {Store} from "vuex";
import type {StoreState} from "~/architecture/domain/types";

const { $store } = useNuxtApp();
const store: Store<StoreState> = $store;
const counters = computed(() => {
  return $store.state.counters;
});

const filterType = ref("null");
const filterValue = ref(null);
const finderValue = ref("");

watch(finderValue, (value) => {
  const filtered = filterCounters(counters.value, filterType.value, filterValue.value, value);
  store.commit('setFilteredCounters', filtered);
}, { immediate: true });

function order(event: Event) {
  const value = (event.target as HTMLSelectElement).value
  if (value === 'null') {
    return;
  }

  const ordered = orderCounters(counters.value, value);
  $store.commit('setCounters', ordered);
}

function filter() {
  const filtered = filterCounters(counters.value, filterType.value, filterValue.value, finderValue.value);
  store.commit('setFilteredCounters', filtered);
}

function reset() {
  filterType.value = "null";
  filterValue.value = null;
  store.commit('setFilteredCounters', []);
}
</script>
