<template>
    <div class="gap-2 flex">
        <div
            class="w-1/5 flex items-center justify-between px-4 py-2 text-xs font-medium bg-white-500 shadow-md shadow-white-500/50">
            <span>Filter</span>
        </div>
        <div class="w-full px-4 py-2 text-xs font-medium shadow-md bg-white shadow-white-500/50">
            <!-- HEADER -->
            <div class="flex justify-end mb-4">
                <Button 
                    v-if="authStore.currentUser"
                    label="Tambah Pertanyaan" 
                    icon="pi pi-plus" 
                    class="!text-xs"
                    @click="dialogFormQuestion = true" 
                />
            </div>

            <div v-if="isLoading" class="flex justify-center items-center py-8">
                <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent"            animationDuration=".5s" aria-label="Custom ProgressSpinner" />
            </div>

            <div v-else-if="questions.length === 0" class="text-center py-8">
                <i class="pi pi-inbox text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-500">Belum ada pertanyaan</p>
            </div>

            <!-- ISI -->
            <div v-else>
                <Questions 
                    v-for="item in questions"
                    :key="item._id"
                    :data="item"
                />
            </div>

            <!-- DIALOG COMPONENT -->
            <div class="card flex justify-center">
                <Dialog v-model:visible="dialogFormQuestion" modal header="Tambah Pertanyaan"
                    :style="{ width: '70rem' }">
                    <FormQuestion 
                        @close="closeDialogFormQuestion" 
                        @question-added="handleQuestionAdded"
                    />
                </Dialog>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Questions from '@/components/Questions/Questions.vue';
import FormQuestion from '@/components/Questions/FormQuestion.vue';
import useAPI from '@/api';
import { useGlobalToast } from '@/composables/useGlobalToast';
import { useAuthenticationStore } from '@/stores/authStore';

// state
const { showSuccess, showError } = useGlobalToast();
const authStore = useAuthenticationStore();
const questions = ref([]);
const dialogFormQuestion = ref(false);
const isLoading = ref(false);

const closeDialogFormQuestion = () => {
    dialogFormQuestion.value = false
}

const getQuestions = async() => {
    try {
        isLoading.value = true;
        const response = await useAPI.get('/question/all');
        questions.value = response.data.data;
    } catch (error) {
        showError('Network Error', 'Internal Server Error.');
    } finally {
        isLoading.value = false;
    }
}

// Handler untuk ketika pertanyaan berhasil ditambahkan
const handleQuestionAdded = async (data) => {
    await getQuestions(); // Reload data
    closeDialogFormQuestion(); // Tutup dialog
}

onMounted(() => {
    getQuestions();
})

</script>