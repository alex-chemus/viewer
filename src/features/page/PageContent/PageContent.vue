<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';
import { IPage } from '../types';
import { Loader, Content } from '@shared'
import { ICard, Card } from '@features/card'
import PageInfo from '../PageInfo/PageInfo.vue'

const props = defineProps<{
  pageData: IPage | null,
  contentType: Content
}>()

/* eslint-disable */
defineEmits<{
  (e: 'addToWatchlist'): void
}>()
/* esling-enable */

const similars = computed(() => {
  if (!props.pageData) return props.pageData
  return props.pageData.similars
    .map((item: any, i: number) => ({
      data: {
        title: item.title,
        imDbRating: item.imDbRating,
        image: item.image,
        id: item.id
      } as ICard,
      i
    }))
})
</script>

<template>
  <section v-if="pageData" class="container-md pt-sm-5">
    <div class="row my-4">
      <div class="col-12 col-xl-4 col-md-6 poster-container">
        <img :src="pageData.image" alt="Poster" class="poster">
      </div>
      <PageInfo :data="pageData" :type="contentType" />
    </div>

    <div class="row justify-content-center mb-5">
      <button class="col-auto btn btn-primary" @click="$emit('addToWatchlist')">
        Add to the watchlist
      </button>
    </div>

    <h3 class="text-center mb-3">Similars</h3>

    <div class="row justify-content-center mb-4">
      <div
        v-for="card in similars"
        :key="card.i"
        class="col-xl-2 col-lg-3 col-sm-4 col-8 py-3"
      >
        <Card :data="card.data" />
      </div>
    </div>
  </section>

  <Loader v-else size="180" />
</template>

<style lang="scss" scoped>
@import '@/common.scss';

.poster {
  max-width: 100%;
  border-radius: 1rem;

  @media (max-width: 768px) {
    max-height: 70vh;
    box-shadow: var(--large-shadow);
  }
}

* {
  color: var(--text-color);
}

.poster-container {
  @include flex(center, flex-start);

  @media (max-width: 768px) {
    padding: 0;
  }
}
</style>
