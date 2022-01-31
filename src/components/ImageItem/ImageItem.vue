<template>
  <img v-if="src" :src="src" :style="styles" alt="Poster">
  <div v-else class="placeholder" ref="placeholder"></div>
</template>


<script>
import { ref, onMounted } from 'vue'
import imageCompression from 'browser-image-compression'

export default {
  name: 'ImageItem',

  props: ['url', 'styles'],

  setup(props) {
    const src = ref(null)
    const placeholder = ref(null)
    const img = ref(null)

    const getLocalSrc = async () => {
      try {
        const res = await fetch(props.url)
        const blob = await res.blob()
        const pressedBlob = await imageCompression(blob, {
          maxWidthOrHeight: 500
        })
        const url = URL.createObjectURL(pressedBlob)
        return url
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