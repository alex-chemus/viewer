<template>
  <div class="container pt-5">
    <div class="wrapper">
    </div>
  </div>
</template>


<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'Page',

  setup(props) {
    const data = ref(null)

    const { commit, getters } = useStore()
    const route = useRoute()
    const router = useRouter()

    const type = route.params.type
    const id = route.params.id

    if (type !== 'movies' && type !== 'series') {
      router.push('/notfound')
    }

    if (getters.hasPage(id)) {
      data.value = getters.getPage(id)
    } else {
      axios(`${getters.url}/Title/${getters.apiKey}/${id}`)
        .then(res => {
          if (res.data.errorMessage !== null || res.status !== 200) {
            throw new Error(`The server sent errorMessage: ${res.data.errorMessage}`)
          }
          data.value = res.data
          commit('addPage', data.value)
        })
        .catch(err => {
          console.log('error in Page:', err)
          router.push('/notfound')
        })
    }

    return { data }
  }
}
</script>


<style lang='scss'>
  @import '@/common.scss';
</style>