<template>
    <div class="filter-panel card">
        <h2 v-if="$slots.title" class="filter-panel-section">
            <slot name="title" />
        </h2>
        <div v-if="$slots.genres" class="filter-panel-section">
            <h3>Genres</h3>
            <slot name="genres" />
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use '@/assets/scss/abstracts';
</style>
