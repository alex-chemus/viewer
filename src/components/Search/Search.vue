<template>
  <form @submit="onFormSubmit" ref="form">
    <input 
      type="text" 
      class="form-control"
      :placeholder="`Search ${type}`"
      @input="onInput"
    />
    <!-- <button
      class="btn btn-primary"
    >
      <svg class="svg-icon search-icon" aria-labelledby="title desc" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.9 19.7">
        <g class="search-path" fill="none" stroke="currentColor">
          <path stroke-linecap="square" d="M18.5 18.3l-5.4-5.4"/>
          <circle cx="8" cy="8" r="7"/>
        </g>
      </svg>
    </button> --> 

    <Popup 
      v-if="isLoading && popupVisible"
      :searchedList="searchedList"
      :isLoading="isLoading"
    />
  </form>
</template>


<script>
import useDebounce from '@/hooks/useDebounce.ts'
import axios from 'axios'
import { useStore } from 'vuex'
import { ref, onBeforeUnmount } from 'vue'
import Popup from '@/components/Popup/Popup.vue'

export default {
  name: 'Search',

  props: ['type'],

  components: { Popup },

  setup(props) {
    const searchedList = ref(null)
    const isLoading = ref(null)
    const popupVisible = ref(true)
    const form = ref(null)
    const { getters } = useStore()

    const onFormSubmit = e => { e.preventDefault() }

    const getSearchedData = e => {
      if (e.target.value.trim() === '') return
      isLoading.value = 'true'
      //console.log('debounced', isLoading.value)
      const inputValue = e.target.value
      const urlType = props.type === 'movies' ? 'SearchMovie' : 'SearchSeries'
      axios(`${getters.url}/${urlType}/${getters.apiKey}/${inputValue}`)
        .then(res => {
          if (res.data.errorMessage?.length || res.status !== 200) {
            throw new Error(`The server sent errorMessage: ${res.data.errorMessage}`)
          }
          //console.log('response:', res)
          isLoading.value = 'false'
          searchedList.value = res.data
        })
        .catch(err => {
          console.log(`failed to search ${props.type}`, err)
        })
    }

    const onInput = useDebounce(getSearchedData, 1000)

    const handleClick = e => {
      if (!form.value.contains(e.target)) {
        popupVisible.value = false
      }
      else {
        popupVisible.value = true
      }
    }

    document.addEventListener('click', handleClick)
    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClick)
    })    

    return { onFormSubmit, onInput, searchedList, isLoading, popupVisible, form }
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
  //max-width: 100vw;
}

input {
  min-width: 0;
  min-height: 0;
}
</style>