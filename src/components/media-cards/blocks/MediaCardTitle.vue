<template>
    <h2>{{ props.title }}</h2>
</template>

<script setup lang="ts">
const props = defineProps<{
    title: string;
}>();
</script>

<style scoped lang="scss">
@use '@/assets/scss/abstracts';
</style>
