<template>
    <div class="media-card card">
        <MediaCardImage :src="props.data.image" :alt="props.data.title" />
        <div class="content">
            <MediaCardScore :score="props.data.score" />
            <MediaCardTitle :title="props.data.title" />
            <MediaCardDate :date="props.data.releaseDate" />
        </div>
    </div>
</template>

<script setup lang="ts">
import MediaCardDate from '@/components/media-cards/blocks/MediaCardDate.vue';
import MediaCardImage from '@/components/media-cards/blocks/MediaCardImage.vue';
import MediaCardScore from '@/components/media-cards/blocks/MediaCardScore.vue';
import MediaCardTitle from '@/components/media-cards/blocks/MediaCardTitle.vue';
import type { MediaCard } from '@/types/media-card.ts';

const props = defineProps<{
    data: MediaCard;
}>();
</script>

<style scoped lang="scss">
@use '@/assets/scss/abstracts';
</style>
