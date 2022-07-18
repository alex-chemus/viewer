<script setup="" lang="ts">
import { defineProps, defineEmits, computed } from 'vue'
import { ICard } from '../types'
import ImageItem from '../ImageItem/ImageItem.vue';

const props = defineProps<{
  cardData: ICard
}>()

/* eslint-disable */
defineEmits<{
  (e: 'addToWatchlist'): void,
  (e: 'seeInfo'): void
}>()
/* eslint-enable */

const colorClass = computed(() => {
  if (!props.cardData.imDbRating) return ''
  let colorClass;
  if (+props.cardData.imDbRating > 8) colorClass = 'text-success';
  else if (+props.cardData.imDbRating > 6) colorClass = 'text-warning';
  else colorClass = 'text-danger';
  return `card-text rating ${colorClass} m-0`;
})
</script>

<template>
  <article class="card" v-if="cardData" data-test="card">
    <div class="card-body">
      <div class="image-container mb-3">
        <ImageItem
          :url="cardData.image"
          :styles="{
            maxHeight: '100%',
            maxWidth: '100%'
          }"
        ></ImageItem>
      </div>

      <h5 class="card-title mb-1" :title="cardData.title">{{ cardData.title }}</h5>

      <div class="wrapper mb-3 text-wrapper">
        <p v-if="cardData.year" class="card-text year m-0">{{ cardData.year }}</p>
        <p :class="colorClass">{{ cardData.imDbRating }}</p>
      </div>

      <div class="wrapper">
        <button @click.prevent="$emit('addToWatchlist')" class="btn btn-primary" data-test="addBtn">Add</button>
        <button @click="$emit('seeInfo')" class="btn btn-warning">Info</button>
      </div>
    </div>
  </article>

  <article v-else class="card card-placeholder">
  </article>
</template>

<style lang="scss" scoped="">
@import '@/common.scss';

.card {
  box-shadow: var(--shadow);
  background-color: #fbfbfb;
  color: #262626;

  &-placeholder {
    height: 350px;
  }
}

.image-container {
  height: 200px;
  width: 100%;
  @include flex(center, center);
}

.wrapper {
  @include flex(space-between, center);
}

.text-wrapper {
  min-height: 1em;
}

.year {
  font-style: italic;
}

.rating {
  font-weight: bold;
}

.card-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media(max-width: 576px) {
    white-space: normal;
  }
}

.btn {
  box-shadow: var(--small-shadow);
}
</style>