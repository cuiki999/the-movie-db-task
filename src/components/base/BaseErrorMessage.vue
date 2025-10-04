<template>
    <p class="error-message">
        {{ text }}
    </p>
</template>

<script setup lang="ts">
defineProps<{
    text: string;
}>();
</script>

<style scoped lang="scss">
@use '@/assets/scss/abstracts';

.error-message {
    color: abstracts.$color-error;
    font-size: 0.8rem;
}
</style>
