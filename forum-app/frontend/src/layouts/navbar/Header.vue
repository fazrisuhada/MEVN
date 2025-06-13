<template>
    <div class="card p-5">
        <Menubar 
            :model="items"
            class="!text-xs !font-medium !bg-white-500 !shadow-md !shadow-white-500/50"
        >
            <template #end>
                <Button 
                    v-if="!authStore.currentUser"
                    label="Login" 
                    icon="pi pi-user" 
                    @click="showDialog=true" 
                />
                <SplitButton
                    v-else
                    :model="itemsSplitBtn" 
                    severity="secondary" 
                    size="small" 
                    outlined
                >
                    <span class="flex items-center cursor-pointer">
                        <Avatar 
                            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" 
                            class="mr-2"
                            shape="circle"
                            style="width: 22px; height: 22px;"
                        />
                        <span class="!text-xs">{{ authStore.currentUser.user.username }}</span>
                    </span>
                </SplitButton>
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
// action pinia
const { logoutStore } = authStore;

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

const itemsSplitBtn = [
    {
        label: 'Dashboard',
        class: '!text-xs',
        command: () => {
            toast.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
        }
    },
    {
        separator: true
    },
    {
        label: 'Sign Out',
        class: '!text-xs',
        command: () => {
            logoutStore();
        }
    }
];

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