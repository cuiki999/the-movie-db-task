<template>
    <div>{{ props.score ?? 'No score' }}</div>
</template>

<script setup lang="ts">
const props = defineProps<{
    score?: number;
}>();
</script>

<style scoped lang="scss">
@use '@/assets/scss/abstracts';
</style>
