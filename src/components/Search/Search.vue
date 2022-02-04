<template>
  <form @submit="onFormSubmit">
    <input 
      type="text" 
      class="form-control me-2"
      :placeholder="`Search ${type}`"
      @input="onInput"
    />
    <button
      class="btn btn-primary"
    >
      <svg class="svg-icon search-icon" aria-labelledby="title desc" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.9 19.7">
        <g class="search-path" fill="none" stroke="currentColor">
          <path stroke-linecap="square" d="M18.5 18.3l-5.4-5.4"/>
          <circle cx="8" cy="8" r="7"/>
        </g>
      </svg>
    </button>

    <Popup 
      v-if="isLoading"
      :searchedList="searchedList"
      :isLoading="isLoading"
    />
  </form>
</template>


<script>
import useThrottle from '@/hooks/useThrottle.js'
import useDebounce from '@/hooks/useDebounce.js'
import axios from 'axios'
import { useStore } from 'vuex'
import { ref } from 'vue'

import Popup from '@/components/Popup/Popup.vue'

export default {
  name: 'Search',

  props: ['type'],

  components: { Popup },

  setup(props) {
    const searchedList = ref(null)
    const isLoading = ref(null)
    const { getters } = useStore()

    const onFormSubmit = e => { e.preventDefault() }

    const getSearchedData = e => {
      if (e.target.value.trim() === '') return
      isLoading.value = 'true'
      console.log('debounced', isLoading.value)
      const inputValue = e.target.value
      const urlType = props.type === 'movies' ? 'SearchMovie' : 'SearchSeries'
      axios(`${getters.url}/${urlType}/${getters.apiKey}/${inputValue}`)
        .then(res => {
          console.log('response:', res)
          isLoading.value = 'false'
          searchedList.value = res.data
        })
    }

    const onInput = useDebounce(getSearchedData, 1000)

    return { onFormSubmit, onInput, searchedList, isLoading }
  }
}
</script>


<style lang="scss" scoped>
@import '@/common.scss';

input {
  width: 100%;
}

svg {
  width: 1em;
  color: white;
}

form {
  @include flex(center, center);
  position: relative;
}

input {
  min-width: 0;
  min-height: 0;
}
</style>