<template>
    <div class="image-wrapper">
        <a href="#" class="image-link"></a>
        <img
            v-if="props.src"
            loading="lazy"
            :src="`https://image.tmdb.org/t/p/w500${props.src}`"
            :alt="props.alt"
            @error="hasImageError = true"
        />
        <div v-if="!src || hasImageError" class="image-fallback" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    src?: string;
    alt?: string;
}>();

const hasImageError = ref(false);
</script>

<style scoped lang="scss">
@use '@/assets/scss/abstracts';

.image-wrapper {
    position: relative;
    width: 100%;
    border-top-left-radius: abstracts.$border-radius-sm;
    border-top-right-radius: abstracts.$border-radius-sm;
    overflow: hidden;
    aspect-ratio: calc(500 / 750);

    @include abstracts.breakpoint(xs) {
        width: 94px;
        min-width: 94px;
        border-top-right-radius: 0;
        border-bottom-left-radius: abstracts.$border-radius-sm;
    }

    img {
        width: 100%;
    }

    .image-link {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .image-fallback {
        width: 100%;
        height: 100%;
        background: abstracts.$color-background-fallback;
    }
}
</style>
