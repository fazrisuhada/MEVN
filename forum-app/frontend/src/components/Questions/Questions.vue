<template>
    <div class="card mb-5">
        <Panel>
            <template #header>
                <div class="flex items-center gap-2">
                    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                    <span class="font-bold">sadfsa</span>
                </div>
            </template>
            <template #footer>
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <div class="flex items-center gap-2">
                        <Button icon="pi pi-thumbs-up" rounded text></Button>
                        <span>
                            {{ props.data.countVote }}
                        </span>
                    </div>
                    <span class="text-surface-500 dark:text-surface-400">
                        {{ dateFormat(props.data.createdAt) }}
                    </span>
                </div>
            </template>
            <RouterLink to="/" class="text-emerald-500 hover:underline text-2xl uppercase">
                {{ props.data.title }}
            </RouterLink>
            <p class="mt-2 content-truncate" v-html="truncateHtmlContent(props.data.content, 100)" />
            <Chip :label="props.data.category" class="mt-3" />
        </Panel>
    </div>
</template>

<script setup>
import Panel from 'primevue/panel';
import Chip from 'primevue/chip';

const dateFormat = (item) => {
    return new Date(item).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

// Fungsi untuk memotong konten HTML
const truncateHtmlContent = (content, maxLength) => {
    if (!content) return '';
    
    // Strip HTML tags untuk menghitung panjang text yang sebenarnya
    const textOnly = content.replace(/<[^>]*>/g, '');
    
    if (textOnly.length <= maxLength) return content;
    
    // Buat temporary div untuk parsing HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    
    let result = '';
    let textLength = 0;
    
    const traverse = (node) => {
        if (textLength >= maxLength) return;
        
        if (node.nodeType === Node.TEXT_NODE) {
            const remainingLength = maxLength - textLength;
            const nodeText = node.textContent;
            
            if (nodeText.length <= remainingLength) {
                result += nodeText;
                textLength += nodeText.length;
            } else {
                const truncated = nodeText.substring(0, remainingLength);
                const lastSpace = truncated.lastIndexOf(' ');
                const finalText = lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated;
                result += finalText + '...';
                textLength = maxLength;
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            result += `<${node.tagName.toLowerCase()}`;
            
            // Add attributes
            for (const attr of node.attributes) {
                result += ` ${attr.name}="${attr.value}"`;
            }
            result += '>';
            
            for (const child of node.childNodes) {
                traverse(child);
                if (textLength >= maxLength) break;
            }
            
            result += `</${node.tagName.toLowerCase()}>`;
        }
    };
    
    for (const child of tempDiv.childNodes) {
        traverse(child);
        if (textLength >= maxLength) break;
    }
    
    return result;
}

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>

<style scoped>
.content-truncate {
    display: -webkit-box;
    -webkit-line-clamp: 3; /* Batasi ke 3 baris */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>