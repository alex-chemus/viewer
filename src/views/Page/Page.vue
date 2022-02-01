<template>
  <section v-if="data" class="container-md pt-5">
    <div class="row mb-4">
      <div class="col-12 col-xl-4 col-md-6 poster-container">
        <img :src="data.image" alt="Poster" class="poster">
      </div>
      <PageContent :data="data" :type="type" />
    </div>

    <h3 class="text-center mb-3">Similars</h3>

    <div class="row justify-content-center mb-4">
      <div 
        v-for="card in getSimilars()" 
        :key="card.i" 
        class="col-xl-2 col-lg-3 col-sm-4 col-8 py-3"
      >
        <Card :data="card" />
      </div>
    </div>
  </section>

  <Loader v-else />
</template>


<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

import Loader from '@/components/Loader/Loader.vue'
import PageContent from '@/components/PageContent/PageContent.vue'
import Card from '@/components/Card/Card.vue'

export default {
  name: 'Page',

  components: { Loader, PageContent, Card },

  setup() {
    const data = ref(null)

    const { commit, getters } = useStore()
    const route = useRoute()
    const router = useRouter()

    const type = ref(route.params.type)
    const id = route.params.id

    if (type.value !== 'movies' && type.value !== 'series') {
      console.log('redirect from type check. type.value:', type.value)
      router.push('/notfound')
    }

    console.log('route.params', route.params)

    if (getters.hasPage(id)) {
      console.log('get Page data from storage')
      data.value = getters.getPage(id)
    } else {
      console.log('fetch Page data')
      axios(`${getters.url}/Title/${getters.apiKey}/${id}`)
        .then(res => {
          if (res.data.errorMessage?.length || res.status !== 200) {
            console.log('error message length', res.data.errorMessage?.length)
            console.log('res.data', res.data)
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

    const getSimilars = () => {
      return data.value.similars.map((item, i) => ({ ...item, i }))
    }

    return { data, type, getSimilars }
  }
}
</script>


<style lang='scss' scoped>
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