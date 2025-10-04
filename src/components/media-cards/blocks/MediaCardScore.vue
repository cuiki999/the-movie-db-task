<template>
    <div class="media-card-score">
        <div class="background-circle" />
        <canvas ref="canvas" class="canvas" width="34" height="34"></canvas>
        <span class="score-in-percent">{{ formattedScore }}</span>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, useTemplateRef } from 'vue';
import type { Ref } from 'vue';

const props = defineProps<{
    score: number;
}>();

const canvas: Ref = useTemplateRef('canvas');

const scoreInPercent = computed((): number => {
    return Math.round(props.score * 10);
});

const formattedScore = computed((): number | string => {
    if (props.score === 0) {
        return 'NR';
    }

    return scoreInPercent.value;
});

const strokeColor = computed(() => {
    if (scoreInPercent.value === 0) {
        return '#ffffff';
    }

    if (scoreInPercent.value < 40) {
        return '#da225f';
    }

    if (scoreInPercent.value < 70) {
        return '#d2d531';
    }

    return '#21d071';
});

onMounted(() => {
    drawPath();
});

const drawPath = () => {
    const ctx = canvas.value.getContext('2d');
    const posX = canvas.value.width / 2;
    const posY = canvas.value.height / 2;

    const degrees = (scoreInPercent.value * 360) / 100;

    ctx.beginPath();
    ctx.arc(posX, posY, 15, Math.PI / 180, (Math.PI / 180) * 360);
    ctx.strokeStyle = strokeColor.value + '55'; // add transparency to hex code
    ctx.lineWidth = '2';
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = strokeColor.value;
    ctx.lineWidth = '2';
    ctx.arc(posX, posY, 15, (Math.PI / 180) * 270, (Math.PI / 180) * (270 + degrees));
    ctx.stroke();
};
</script>

<style scoped lang="scss">
@use '@/assets/scss/abstracts';

.media-card-score {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 38px;
    height: 38px;
    top: -19px;

    @include abstracts.breakpoint(xs) {
        display: none;
    }

    .background-circle {
        position: absolute;
        top: 0;
        left: 0;
        width: 38px;
        height: 38px;
        background: #081c22;
        border-radius: 50%;
    }

    .canvas {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 34px;
        height: 34px;
        z-index: 2;
    }

    .score-in-percent {
        position: relative;
        font-size: 0.8rem;
        font-weight: abstracts.$font-weight-bold;
        color: abstracts.$color-text-lighten;
    }
}
</style>
