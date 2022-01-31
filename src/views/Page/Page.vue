<template>
  <section v-if="data" class="container-md pt-5">
    <div class="row">
      <div class="col-12 col-xl-4 col-md-6">
        <img :src="data.image" alt="Poster" class="poster">
      </div>

      <PageContent :data="data" />
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

export default {
  name: 'Page',

  components: { Loader, PageContent },

  setup() {
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

    const getBadgeClasses = (rating) => {
      let cls = ['badge']
      if (rating > 8) {
        cls.push('bg-success')
      } else if (rating > 6) {
        cls.push('bg-warning')
        cls.push('text-dark')
      } else {
        cls.push('bg-danger')
      }
      return cls.join(' ')
    }

    return { data, getBadgeClasses }
  }
}
</script>


<style lang='scss' scoped>
  @import '@/common.scss';

  .poster {
    max-width: 100%;

    @media (max-width: 768px) {
      max-height: 70vh;
      box-shadow: var(--large-shadow);
    }
  }

  * {
    color: var(--text-color);
  }

  .col-12 {
    @include flex(center, center);
  }
</style>