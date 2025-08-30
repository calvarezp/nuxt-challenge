<template>
  <div class="border p-2 mb-2">
    <p>Contador: {{ valor }}</p>
    <button @click="incrementar">+</button>
    <button @click="decrementar">-</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const valor = ref(0)

function incrementar() {
  valor.value++
}

function decrementar() {
  valor.value--
}
</script>