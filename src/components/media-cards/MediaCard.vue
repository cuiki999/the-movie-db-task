<template>
    <div class="media-card card">
        <MediaCardImage :src="props.imageSrc" :alt="props.title" />
        <div class="card-content">
            <MediaCardScore :score="props.score" />
            <div class="title-date-wrapper">
                <MediaCardTitle :title="props.title" />
                <MediaCardDate v-if="props.releaseDate" :date="props.releaseDate" />
            </div>
            <MediaCardOverview v-if="props.overview" :overview="props.overview" />
        </div>
    </div>
</template>

<script setup lang="ts">
import MediaCardDate from '@/components/media-cards/blocks/MediaCardDate.vue';
import MediaCardImage from '@/components/media-cards/blocks/MediaCardImage.vue';
import MediaCardOverview from '@/components/media-cards/blocks/MediaCardOverview.vue';
import MediaCardScore from '@/components/media-cards/blocks/MediaCardScore.vue';
import MediaCardTitle from '@/components/media-cards/blocks/MediaCardTitle.vue';

const props = defineProps<{
    imageSrc?: string;
    title: string;
    score: number;
    releaseDate?: Date;
    overview?: string;
}>();
</script>

<style scoped lang="scss">
@use '@/assets/scss/abstracts';

.media-card {
    @include abstracts.breakpoint(xs) {
        display: flex;
    }

    .card-content {
        position: relative;
        padding: 26px 10px;

        @include abstracts.breakpoint(xs) {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            max-width: calc(100% - 94px);
        }
    }
}
</style>
