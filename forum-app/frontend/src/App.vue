<template>
  <h1>Selamat Datang {{ message }}</h1>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const message = ref('');

const fetchMessage = async () => {
  try { 
    const datas = await axios.get('http://localhost:3000/');
    message.value = datas.data.message
    console.log(datas);
  } catch (error) {
    console.log(error);
  }
} 

onMounted(()=>{
  fetchMessage();
})
</script>