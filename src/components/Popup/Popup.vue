<template>
  <div class="popup">
    <!-- <Loader v-if="isLoading === 'true'" size="70" /> -->
    <div v-if="isLoading === 'true'" class="loader-container">
      <Loader size="70" />
    </div>

    <ul v-else-if="isLoading === 'false' && list" class="list-group">
      <PopupItem v-for="item in list" :key="item.i" :item="item" />
    </ul>
  </div>
</template>


<script>
import { toRaw, watchEffect, ref } from 'vue'
import Loader from '@/components/Loader/Loader.vue'
import PopupItem from '@/components/PopupItem/PopupItem.vue'

export default {
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
}
</script>


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