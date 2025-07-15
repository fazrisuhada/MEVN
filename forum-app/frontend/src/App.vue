<template>
  <Toast position="bottom-left"/>
  <div>
    <Header />
    <div class="p-5 ml-1">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import Header from "./layouts/navbar/Header.vue";
import Toast from 'primevue/toast';
</script>

<style scoped>
.p-toast-message-error .p-toast-icon {
  display: none !important;
}

:deep(.p-toast-message-error .p-toast-icon) {
  display: none !important;
}
</style>