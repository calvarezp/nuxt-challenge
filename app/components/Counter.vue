<template>
  <li>
    <!-- Counter name -->
    <span>{{ counter.name }}</span>

    <!-- Subtract button -->
    <button
        :disabled="counter.value <= 0"
        @click="() => subtract(counter.id)"
    >-</button>

    <!-- Counter value -->
    <span>{{ counter.value }}</span>

    <!-- Sum button -->
    <button
        :disabled="counter.value >= 20"
        @click="() => sum(counter.id)"
    >+</button>

    <!-- Delete button -->
    <button @click="() => remove(counter.id)">Eliminar</button>
  </li>
</template>

<script setup lang="ts">
import type {Counter} from "~/architecture/domain/types";
import type {Store} from "vuex";

defineProps<{ counter: Counter }>()

const { $store } = useNuxtApp();
const store = $store as Store<any>;

function sum(id: string) {
  store.commit('sumValue', id);
}

function subtract(id: string) {
  store.commit('subtractValue', id);
}

function remove(id: string) {
  const confirmed = window.confirm("¿Confirma eliminar el contador de la lista?");
  if (!confirmed) {
    return;
  }

  store.commit('removeCounter', id);
  name.value = "";
}
</script>