<template>
  <div>
    <p v-if="counters.length === 0">
      No hay contadores disponibles.
    </p>
    <ul>
      <li v-for="(item, index) in counters" :key="index">
        <span>{{ item.name }}</span>
        <button
            @click="() => subtract(item.id)"
        >-</button>
        <span>{{ item.value }}</span>
        <button
            :disabled="item.value >= 20"
            @click="() => sum(item.id)"
        >+</button>
        <button @click="() => remove(item.id)">Eliminar</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type {Store} from "vuex";

const { $store } = useNuxtApp();
const store = $store as Store<any>;

const counters = computed(() => {
  return $store.state.counters;
});

function sum(id: string) {
  store.dispatch('sumValue', id);
}

function subtract(id: string) {
  store.dispatch('subtractValue', id);
}

function remove(id: string) {
  const confirmed = window.confirm("¿Confirma eliminar el contador de la lista?");
  if (!confirmed) {
    return;
  }

  store.dispatch('removeCounter', id);
  name.value = "";
}
</script>