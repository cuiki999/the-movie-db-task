<template>
    <p>{{ formattedDate }}</p>
</template>

<script setup lang="ts">
const props = defineProps<{
    date: Date;
}>();

// todo utils/composables
const formattedDate = props.date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/abstracts';
</style>
