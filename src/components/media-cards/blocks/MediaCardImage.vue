<template>
    <div class="image-wrapper">
        <img :src="props.src" :alt="props.alt" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    src: string;
    alt?: string;
}>();
</script>

<style scoped lang="scss">
@use '@/assets/scss/abstracts';
</style>
