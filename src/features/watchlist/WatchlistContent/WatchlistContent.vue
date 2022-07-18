<script setup="" lang="ts">
import { defineProps, defineEmits } from 'vue'
import { IStorage, Content } from '@shared'
import WatchlistItem from '../WatchlistItem/WatchlistItem.vue'

type List = {
  i: number,
  data: IStorage
}

defineProps<{
  movies: List[] | null,
  series: List[] | null
}>()

interface Item {
  id: string,
  contentType: Content
}

/* eslint-disable */
const emit = defineEmits<{
  (e: 'remove-item', item: Item): void
}>()
/* eslint-enable */

const removeItem = (item: Item) => {
  emit('remove-item', item)
}
</script>

<template>
  <section class="container pt-5">
    <div class="row justify-content-around">
      <div class="col-xxl-4 col-md-6 mb-5 mw-100vw">
        <h3 class="text-center mb-4">Movies</h3>
        <ul v-if="movies?.length" class="list-group">
          <WatchlistItem
            v-for="item in movies"
            :key="item.i"
            :data="item.data"
            @remove="removeItem"
          />
        </ul>
        <h4 v-else class="text-center">¯\_(ツ)_/¯</h4>
      </div>

      <div class="col-xxl-4 col-md-6 mb-5 mw-100vw">
        <h3 class="text-center mb-4">Series</h3>
        <ul v-if="series?.length" class="list-group">
          <WatchlistItem
            v-for="item in series"
            :key="item.i"
            :data="item.data"
            @remove="removeItem"
          />
        </ul>
        <h4 v-else class="text-center">¯\_(ツ)_/¯</h4>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/common.scss';

* {
  color: var(--text-color);
}

div, ul {
  min-width: 0;
}

.mw-100vw {
  max-width: 100vw;
}
</style>