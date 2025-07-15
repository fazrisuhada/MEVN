<template>
    <ProgressSpinner 
        style="width: 30px; height: 30px;" 
        strokeWidth="4" 
        fill="transparent" 
        aria-label="Custom ProgressSpinner"
        class="custom-spinner"
    />
</template>

<style scoped>
::v-deep(.custom-spinner .p-progress-spinner-circle) {
    stroke: #22c55e!important;
}
</style>
