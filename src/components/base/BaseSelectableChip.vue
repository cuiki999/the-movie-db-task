<template>
    <button :class="chipClasses" @click="$emit('toggle-chip')">
        {{ title }}
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    isSelected: boolean;
    title: string;
    value: number;
}>();

defineEmits(['toggle-chip']);

const chipClasses = computed(() => {
    const classes = ['chip'];

    if (props.isSelected) {
        classes.push('selected');
    }

    return classes.join(' ');
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/abstracts';

.chip {
    padding: 4px 12px; // todo
    background: abstracts.$color-background-primary;
    color: abstracts.$color-text-primary;
    font-size: 0.9rem;
    border: 1px solid abstracts.$color-border-dark;
    border-radius: abstracts.$border-radius-lg;

    &.selected,
    &:hover {
        background: abstracts.$color-action;
        color: abstracts.$color-text-lighten;
        border: 1px solid transparent;
        cursor: pointer;
    }
}
</style>
