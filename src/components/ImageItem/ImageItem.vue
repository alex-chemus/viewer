<template>
  <img v-if="src" :src="src" :style="styles" alt="Poster">
  <div v-else class="placeholder" ref="placeholder"></div>
</template>


<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'ImageItem',

  props: ['url', 'styles'],

  setup(props) {
    const src = ref(null)
    const placeholder = ref(null)
    const img = ref(null)

    const getLocalSrc = async () => {
      //fetch from server
      try {
        const res = await fetch('/api/get-img', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url: props.url
          })
        })
        const buffer = await res.arrayBuffer()
        //console.log(buffer, res.headers.get('Content-Type').split(';')[0])
        const blob = new Blob([buffer], {
          type: res.headers.get('Content-Type').split(';')[0]
        })
        //console.log(blob)
        return URL.createObjectURL(blob)
      } catch (err) {
        console.log('failed to get local src', err)
      }
    }

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        src.value = getLocalSrc()
        getLocalSrc()
          .then(url => src.value = url)
      }
    }, {
      threshold: 1,
      rootMargin: '200px',
    })

    onMounted(() => {
      observer.observe(placeholder.value)
    })

    return { src, img, placeholder }
  }
}
</script>


<style lang="scss" scoped>
  @import '@/common.scss';

  .placeholder {
    height: 100%;
    width: 100%;
    background-color: var(--secondary-color);
  }
</style>