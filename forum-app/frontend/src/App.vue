<template>
  <Toast position="bottom-left"/>
        
  <Header />
</template>

<script setup>
import { ref, onMounted } from "vue";
import Header from "./layouts/navbar/Header.vue";

// prime vue 
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { useGlobalToast } from '@/composables/useGlobalToast.js';

const toast = useToast();
const { setGlobalToast } = useGlobalToast();

// const getResponseBE = async () => {
//   const data = await useAPI.get("/test");
//   console.log(data);
// }

onMounted(() => {
  // getResponseBE();
  setGlobalToast(toast);
})
</script>