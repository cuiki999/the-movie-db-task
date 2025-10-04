<template>
    <button :class="buttonClasses" @click="onButtonClick">
        {{ text }}
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    isInactive?: boolean;
    text: string;
    additionalClasses?: string;
}>();

const emit = defineEmits(['press-button']);

const buttonClasses = computed(() => {
    const classes = ['button'];

    if (props.isInactive) {
        classes.push('inactive');
    }

    if (props.additionalClasses) {
        classes.push(props.additionalClasses);
    }

    return classes.join(' ');
});

const onButtonClick = () => {
    if (props.isInactive) {
        return;
    }

    emit('press-button');
};
</script>

<style scoped lang="scss">
@use '@/assets/scss/abstracts';

.button {
    width: 100%;
    padding: 10px 0;
    color: abstracts.$color-text-lighten;
    background-color: abstracts.$color-action;
    border-radius: 20px;
    font-size: 1.1rem;
    font-weight: abstracts.$font-weight-normal;
    cursor: pointer;

    &:hover {
        background-color: abstracts.$color-action-hover;
    }

    &.inactive {
        color: abstracts.$color-text-muted;
        background-color: abstracts.$color-action-inactive;
        cursor: not-allowed;
        pointer-events: none;
    }

    &.load-button {
        font-size: 1.2rem;
        font-weight: abstracts.$font-weight-bold;
        border-radius: abstracts.$border-radius-sm;
    }
}
</style>
