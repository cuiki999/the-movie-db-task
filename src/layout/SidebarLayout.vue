<template>
    <section class="sidebar-layout">
        <div class="sidebar">
            <slot name="sidebar"></slot>
        </div>
        <div class="content">
            <slot name="content"></slot>
        </div>
    </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use '@/assets/scss/abstracts';

.sidebar-layout {
    display: flex;
    gap: 40px;

    @include abstracts.breakpoint(sm) {
        flex-direction: column;
    }

    .sidebar {
        background: aliceblue;
        max-width: 300px;
    }

    .content {
        background: #666;
    }
}
</style>
