<template>
    <div class="gap-2 flex items-start">
        <div class="w-1/5 flex items-center justify-between px-2 py-2 text-xs font-medium bg-white-500 shadow-md shadow-white-500/50">
            <Button icon="pi pi-thumbs-up" rounded text></Button>
            <span>
                {{ questionData.countVote }}
            </span>
        </div>
        <Panel class="flex-1 min-w-0 px-4 py-2 text-xs font-medium shadow-md bg-white shadow-white-500/50">
            <template #footer>
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <div class="flex items-center gap-2">
                        <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" size="small"/>
                        <span class="font-bold">sadfsa</span>
                    </div>
                    <span class="text-surface-500 dark:text-surface-400">
                        {{ dateFormat(questionData.createdAt) }}
                    </span>
                </div>
            </template>
            <h2 class="text-2xl font-bold mb-2 break-words">
                {{ questionData.title }}
            </h2>
            <div class="mt-2 prose max-w-none break-words overflow-wrap-anywhere" v-html="questionData.content" />
            <Chip :label="questionData.category" class="mt-3" />
        </Panel>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import Panel from 'primevue/panel';
import Chip from 'primevue/chip';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';

const questionData = computed(() => {
    return props.data.data || props.data;
});

const dateFormat = (item) => {
    return new Date(item).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>

<!-- <style scoped>
.prose {
    line-height: 1.6;
}

.prose p {
    margin-bottom: 1em;
}

.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    font-weight: 600;
}

.prose ul, .prose ol {
    margin-bottom: 1em;
    padding-left: 1.5em;
}

.prose li {
    margin-bottom: 0.5em;
}

.prose blockquote {
    border-left: 4px solid #e5e7eb;
    padding-left: 1em;
    margin: 1em 0;
    font-style: italic;
    color: #6b7280;
}

.prose pre {
    background-color: #f3f4f6;
    padding: 1em;
    border-radius: 0.375rem;
    overflow-x: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
}

.prose code {
    background-color: #f3f4f6;
    padding: 0.2em 0.4em;
    border-radius: 0.25rem;
    font-size: 0.875em;
    word-wrap: break-word;
}
</style> -->