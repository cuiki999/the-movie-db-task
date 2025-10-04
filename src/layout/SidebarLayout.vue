<template>
    <section class="content-wrapper">
        <h1 class="sidebar-layout-title">
            <slot name="title"></slot>
        </h1>
        <div class="sidebar-layout">
            <div class="left-sidebar">
                <slot name="sidebar"></slot>
            </div>
            <div class="right-content">
                <slot name="content"></slot>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use '@/assets/scss/abstracts';

.sidebar-layout-title {
    margin-bottom: 20px;
    font-size: 1.5rem;
    font-weight: abstracts.$font-weight-semi-bold;
}

.sidebar-layout {
    display: flex;
    gap: 30px;

    @include abstracts.breakpoint(xs) {
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
