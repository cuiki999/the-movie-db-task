<template>
    <div class="card-grid-layout">
        <slot></slot>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use '@/assets/scss/abstracts';

.card-grid-layout {
    display: flex;
    justify-content: flex-start;
    flex-flow: wrap;
    gap: 40px; // todo
}
</style>
