<template>
  <li>
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
</template>

<script setup lang="ts">
import type {Counter} from "~/architecture/domain/types";

defineProps<{ item: Counter }>()
import type {Store} from "vuex";

const { $store } = useNuxtApp();
const store = $store as Store<any>;

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