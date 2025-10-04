<template>
    <p class="media-card-overview">{{ overview }}</p>
</template>

<script setup lang="ts">
defineProps<{
    overview: string;
}>();
</script>

<style scoped lang="scss">
@use '@/assets/scss/abstracts';

.media-card-overview {
    display: none;

    @include abstracts.breakpoint(xs) {
        display: block;
        display: -webkit-box;
        font-size: 0.8rem;
        height: 2.6em;
        line-height: 1.3em;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>
