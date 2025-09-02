<template>
  <li>
    <span>{{ item.name }}</span>
    <button
        :disabled="item.value <= 0"
        @click="() => subtract(item.id)"
    >-</button>
    <span>{{ item.value }}</span>
    <button
        :disabled="item.value >= 20"
        @click="() => sum(item.id)"
    >+</button>
    <button @click="() => remove(item.id)">Eliminar</button>
  </li>
</template>

<script setup lang="ts">
import type {Counter} from "~/architecture/domain/types";
import type {Store} from "vuex";

defineProps<{ item: Counter }>()

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