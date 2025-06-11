<template>
    <div class="card p-5">
        <Menubar :model="items">
            <template #end>
                <Button label="Login" icon="pi pi-user" @click="showDialog=true" />
            </template>
        </Menubar>
    </div>

    <!-- dialog login start-->
        <AuthFrm v-model:visible="showDialog" />
    <!-- dialog login end -->
</template>

<script setup>
import { ref } from "vue";
import Menubar from 'primevue/menubar';
import AuthFrm from "@/components/Auth/AuthFrm.vue";
// pinia
import { storeToRefs } from "pinia";
import { useAuthenticationStore } from "@/stores/authStore.js";

const authStore = useAuthenticationStore();

// state pinia
const { showDialog } = storeToRefs(authStore);

const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home'
    },
    {
        label: 'Projects',
        icon: 'pi pi-search',
        items: [
            {
                label: 'Components',
                icon: 'pi pi-bolt'
            },
            {
                label: 'Blocks',
                icon: 'pi pi-server'
            },
        ]
    },
    {
        label: 'Contact',
        icon: 'pi pi-envelope'
    }
]);
</script>

<!-- <style scoped>
:deep(.p-menubar) {
    @apply rounded-none;
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
}
</style> -->