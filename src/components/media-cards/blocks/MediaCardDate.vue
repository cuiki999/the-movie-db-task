<template>
    <p class="media-card-date">{{ formattedDate }}</p>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    date: Date;
}>();

const formattedDate = computed((): string => {
    return props.date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/abstracts';

.media-card-date {
    margin-top: 2px;
    color: abstracts.$color-text-muted;
    font-size: 0.9rem;
}
</style>
