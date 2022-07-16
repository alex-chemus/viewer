<script setup="" lang="ts">
import { defineProps, defineEmits, ref, onMounted, onUpdated } from 'vue'
import { ICard, Card } from '@features/card'
import { Loader, Content } from '@shared'
import { Search } from '@features/search'
import ConnectionError from '../ConnectionError/ConnectionError.vue'

type ListItem = {
  data: ICard,
  i: number,
}

defineProps<{
  isError: boolean,
  cardsList: ListItem[] | null,
  contentType: Content
}>()

/* eslint-disable */
const emit = defineEmits<{
  (e: 'observe'): void
}>()
/* eslint-enable */

const divRef = ref<HTMLDivElement | null>(null)
const isObserving = ref<boolean>(false)

const observer = new IntersectionObserver((entries) => {
  if (entries.some(i => i.isIntersecting)) {
    emit('observe')
  }
}, { // options
  threshold: 0,
  rootMargin: '10px'
})

const setObserver = () => {
  if (divRef.value && !isObserving.value) {
    observer.observe(divRef.value)
    isObserving.value = true
  }
}
onMounted(setObserver)
onUpdated(setObserver)
</script>

<template>
  <ConnectionError v-if="isError" />

  <section v-else-if="cardsList && cardsList.length > 0" class="container pt-5">
    <div class="row justify-content-center mb-4">
      <div class="col-xl-6 col-lg-8 col-12">
        <Search
          :contentType="contentType"
        />
      </div>
    </div>

    <h1 class="mb-3 text-center">Popular {{ contentType }}</h1>

    <div class="row justify-content-center mb-3">
      <div v-for="card in cardsList" :key="card.i" class="col-xl-2 col-lg-3 col-sm-4 col-8 py-3">
        <Card :data="card.data" />
      </div>
    </div>

    <div class="row justify-content-center" ref="divRef"></div>
  </section>

  <Loader v-else size="180" />
</template>

<style lang="scss" scoped>
@import '@/common.scss';

h1 {
  color: var(--text-color);
}

.container {
  min-width: 0;
}

.loadMore {
  margin: 0 auto;
}
</style>