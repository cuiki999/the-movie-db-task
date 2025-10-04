<template>
    <div class="filter-panel card">
        <div class="panel-section clickable" @click="isFilterExpanded = !isFilterExpanded">
            <h2 v-if="$slots.title" :class="['title', { collapsed: !isFilterExpanded }]">
                <slot name="title" />
            </h2>
        </div>
        <template v-if="isFilterExpanded">
            <div v-if="$slots.genres" class="panel-section">
                <h3 class="subtitle">Genres</h3>
                <slot name="genres" />
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isFilterExpanded = ref(true);
</script>

<style scoped lang="scss">
@use '@/assets/scss/abstracts';

.filter-panel {
    width: 260px;
    margin-bottom: 20px;

    @include abstracts.breakpoint(xs) {
        width: 100%;
    }

    .panel-section {
        padding: 14px 16px 16px;

        &:not(&:first-child) {
            border-top: 1px solid abstracts.$color-border-light;
        }

        .title {
            position: relative;
            font-size: 1.1rem;
            font-weight: abstracts.$font-weight-semi-bold;

            &:after {
                content: '';
                position: absolute;
                width: 6px;
                height: 6px;
                top: 6px;
                right: 2px;
                border-bottom: 2px solid abstracts.$color-text-primary;
                border-right: 2px solid abstracts.$color-text-primary;
                transform: rotate(45deg);
            }

            &.collapsed:after {
                top: 8px;
                right: 6px;
                transform: rotate(-45deg);
            }
        }

        .subtitle {
            margin-bottom: 10px;
            font-size: 0.9rem;
            font-weight: abstracts.$font-weight-light;
        }
    }
}
</style>
