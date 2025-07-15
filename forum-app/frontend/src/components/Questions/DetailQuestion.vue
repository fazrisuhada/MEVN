<template>
    <DetailQuestionComponent v-if="detailQuestion" :data="detailQuestion"/>
    <LoadingSpinner v-else />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import LoadingSpinner from '../General/LoadingSpinner.vue';
import { useRoute } from 'vue-router';
import DetailQuestionComponent from './DetailQuestionComponent.vue';
import useAPI from '@/api';
import { useGlobalToast } from '@/composables/useGlobalToast';

const { showError } = useGlobalToast();

const route = useRoute();
const detailQuestion = ref(null);

console.log(route.params.id);

const fetchDetailQuestion = async() => {
    try {
        const response = await useAPI.get(`/question/${route.params.id}`);
        detailQuestion.value = response.data;
    } catch (error) {
        showError('Network Error', 'Internal Server Error.');
    }
}

onMounted(() => {
    fetchDetailQuestion();
});
</script>