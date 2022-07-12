<script setup lang="ts">
import { defineProps } from 'vue'
import Loader from '@/components/Loader/Loader.vue'
import PopupItem from '@/components/PopupItem/PopupItem.vue'
import { computed } from '@vue/reactivity'

const props = defineProps<{
  searchedList: {
    results: any[] // IPopupItem
  },
  isLoading: boolean
}>()

// list of search results (movies and series)
const resultsList = computed(() => {
  return props.searchedList.results
    .map((item: any, i: number) => ({ i, ...item }))
})

/* watch(() => {
  const searchedList = toRaw
}) */

/* export default {
  name: 'Popup',

  props: ['searchedList', 'isLoading'],

  components: { Loader, PopupItem },

  setup(props) {
    const list = ref(null)

    //console.log('searched list from setup', props.searchedList)

    watchEffect(() => {
      //console.log('triggered getList. isLoading', props.isLoading)
      const searchedList = toRaw(props.searchedList)
      if (!searchedList) return
      const localList = searchedList.results.map((item, i) => {
        item.i = i
        return item
      })
      list.value = localList
    })

    return { list }
  }
} */
</script>

<template>
  <div class="popup">
    <!-- <Loader v-if="isLoading === 'true'" size="70" /> -->
    <div v-if="isLoading" class="loader-container">
      <Loader size="70" />
    </div>

    <ul v-else-if="!isLoading && resultsList" class="list-group">
      <PopupItem v-for="item in resultsList" :key="item.i" :item="item" />
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import '@/common.scss';

.popup {
  //border: 1px solid red;
  width: 100%;
  min-height: 100px;
  background: white;
  position: absolute;
  top: 120%;
  left: 0;
  z-index: 1;
  border-radius: .25rem;
  box-shadow: var(--large-shadow);
}

.loader-container {
  width: 100%;
  @include flex(center, center);
  padding-top: 15px;
}

ul {
  max-width: 100vw;
  min-width: 0;
  //border: 1px solid red;
}
</style>
