<template>
  <dialog ref="modal">
    <h2>Nuevo contador</h2>
    <input
        type="text"
        placeholder="Ingrese nombre"
        v-model="name"
    />
    <br />
    <button
        @click="() => {
          addCounter();
        }"
        :disabled="name.trim().length === 0 || name.length > 20"
    >Agregar</button>
    <button @click="closeDialog">Cerrar</button>
  </dialog>

</template>
<script setup lang="ts">
import { watch,ref } from 'vue';
import type {Store} from "vuex";

const { $store } = useNuxtApp();
const store = $store as Store<any>
const modal = ref(null);
const name = ref("");

watch(
    () => store.state.isModalOpen,
    (open) => {
      if (open) modal.value?.showModal()
      else modal.value?.close()
    }
)

function closeDialog() {
  name.value = "";
  store.dispatch('closeModal')
}

function addCounter() {
  if (!name.value.trim()) {
    window.alert('Nombre del contador vacío');
    return;
  }

  const id = crypto.randomUUID();
  const payload = { id, name: name.value, value: 0 };
  store.dispatch('addCounter', payload);
  name.value = "";
  closeDialog();
}
</script>
