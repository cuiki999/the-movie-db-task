<template>
    <div class="media-card card">
        <MediaCardImage :src="props.imageSrc" :alt="props.title" />
        <div class="content">
            <MediaCardScore :score="props.score" />
            <MediaCardTitle :title="props.title" />
            <MediaCardDate :date="props.releaseDate" />
        </div>
    </div>
</template>

<script setup lang="ts">
import MediaCardDate from '@/components/media-cards/blocks/MediaCardDate.vue';
import MediaCardImage from '@/components/media-cards/blocks/MediaCardImage.vue';
import MediaCardScore from '@/components/media-cards/blocks/MediaCardScore.vue';
import MediaCardTitle from '@/components/media-cards/blocks/MediaCardTitle.vue';

const props = defineProps<{
    imageSrc?: string;
    title: string;
    score?: number;
    releaseDate?: Date;
}>();
</script>

<style scoped lang="scss">
@use '@/assets/scss/abstracts';

.media-card {
    width: 300px;
    height: 600px;
}
</style>
