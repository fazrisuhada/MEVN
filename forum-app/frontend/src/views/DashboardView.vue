<template>
    <div>
        <h1 v-if="user">Selamat Datang kembali {{ user.username }} 👋</h1>
        <h1 v-else>Loading...</h1>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useAPI from "@/api";

const user = ref(null);

const getUser = async () => {
    const response = await useAPI.get("/auth/profile");
    user.value = response.data.data.user;
    // console.log(user.value);
};

onMounted(() => {
    getUser();
})
</script>