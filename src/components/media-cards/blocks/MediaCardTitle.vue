<template>
    <h2 class="media-card-title">
        <a href="#">{{ props.title }}</a>
    </h2>
</template>

<script setup lang="ts">
const props = defineProps<{
    title: string;
}>();
</script>

<style scoped lang="scss">
@use '@/assets/scss/abstracts';

.media-card-title {
    font-size: 0.9rem;
    font-weight: abstracts.$font-weight-bold;

    a {
        text-decoration: none;
        color: inherit;

        &:hover {
            color: abstracts.$color-link;
        }
    }
}
</style>
