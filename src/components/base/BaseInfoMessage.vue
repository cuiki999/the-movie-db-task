<template>
    <p class="info-message">
        {{ text }}
    </p>
</template>

<script setup lang="ts">
defineProps<{
    text: string;
}>();
</script>

<style scoped lang="scss">
.info-message {
    font-size: 0.9rem;
}
</style>
