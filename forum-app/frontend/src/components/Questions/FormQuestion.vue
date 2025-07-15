<template>
    <form @submit.prevent="handleSubmit">
        <div class="flex items-center gap-4 mb-4">
            <InputText 
                v-model="question.title" 
                id="title" 
                class="flex-auto" 
                autocomplete="off" 
                placeholder="Title Question"
                :invalid="errors.title"
            />
        </div>
        <div class="flex items-center gap-4 mb-4">
            <Editor 
                v-model="question.content" 
                editorStyle="height: 320px" 
                placeholder="Type something" 
                class="w-full"
            />
        </div>
        <div class="flex items-center gap-4 mb-4">
            <Dropdown 
                v-model="question.category" 
                :options="categories" 
                placeholder="Choose category" 
                class="w-full"
                :invalid="errors.category"
            />
        </div>
        <div class="flex justify-end gap-2">
            <Button 
                type="button" 
                label="Cancel" 
                severity="secondary" 
                @click="$emit('close')"
            />
            <Button 
                type="submit" 
                label="Save" 
                :loading="isSubmitting"
                :disabled="!isFormValid"
            />
        </div>
    </form>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import useAPI from '@/api';
import { useGlobalToast } from '@/composables/useGlobalToast';

const { showSuccess, showError, showWarn } = useGlobalToast();

const categories = ref(['Backend', 'Frontend', 'DevOps', 'UI/UX']);
const isSubmitting = ref(false);

const question = reactive({
    title: '',
    content: '',
    category: ''
});

const errors = reactive({
    title: false,
    content: false,
    category: false
});

// Computed untuk validasi form
const isFormValid = computed(() => {
    return question.title.trim() && 
           question.content.trim() && 
           question.category;
});

const resetForm = () => {
    question.title = '';
    question.content = '';
    question.category = '';
    
    // Reset errors
    errors.title = false;
    errors.content = false;
    errors.category = false;
}

const validateForm = () => {
    errors.title = !question.title.trim();
    errors.content = !question.content.trim();
    errors.category = !question.category;
    
    return isFormValid.value;
}

const handleErrorMessages = (errorData) => {
    if (errorData.errors) {
        const allErrors = [];
        Object.keys(errorData.errors).forEach(field => {
            const fieldErrors = errorData.errors[field];
            fieldErrors.forEach(error => {
                allErrors.push(error);
            });
            
            // Set field error untuk visual feedback
            if (errors.hasOwnProperty(field)) {
                errors[field] = true;
            }
        });
        
        if (allErrors.length > 0) {
            const summary = allErrors[0];
            const detail = allErrors.length > 1 ? allErrors.slice(1).join(', ') : '';
            showError('Validation Error', summary + (detail ? ` | ${detail}` : ''));
        }
    } else if (errorData.message) {
        showError('Error', errorData.message);
    } else {
        showError('Error', 'Gagal menambahkan pertanyaan');
    }
}

const handleSubmit = async() => {
    // Reset errors
    Object.keys(errors).forEach(key => errors[key] = false);
    
    if (!validateForm()) {
        showWarn('Validation Error', 'All fields are required.');
        return;
    }

    isSubmitting.value = true;

    try {
        const response = await useAPI.post('/question/add', {
            title: question.title.trim(),
            content: question.content.trim(),
            category: question.category
        });
        
        if (response.data?.success) {
            showSuccess('Success', response.data.message);
            resetForm();
            // Emit event untuk reload dan close
            emit('questionAdded', response.data);
            emit('close');
        }
        
    } catch(error) {        
        if (error.response?.data) {
            handleErrorMessages(error.response.data);
        } else {
            showError('Network Error', 'Internal Server Error.');
        }
    } finally {
        isSubmitting.value = false;
    }
}

const emit = defineEmits(['close', 'questionAdded']);
</script>