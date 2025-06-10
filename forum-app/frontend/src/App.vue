<template>
  <Header />
</template>

<script setup>
import { ref, onMounted } from "vue";
import Header from "./layouts/navbar/Header.vue";
import customAxios from "./api.js"

const getResponseBE = async () => {
  const data = await customAxios.get("/test");
  console.log(data);
}

onMounted(() => {
  getResponseBE();
})
</script>