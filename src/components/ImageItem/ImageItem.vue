<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';

const props = defineProps<{
  url: string,
  styles: any
}>();

const src = ref<string | null>(null);
const placeholder = ref<HTMLDivElement | null>(null);

const getLocalSrc = async () => {
  // fetch from server
  try {
    const res = await fetch('https://viewer-img.herokuapp.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: props.url,
      }),
    });
    const buffer = await res.arrayBuffer();
    // console.log(buffer, res.headers.get('Content-Type').split(';')[0])
    const blob = new Blob([buffer], {
      // eslint-disable-next-line
      type: res.headers.get('Content-Type')!.split(';')[0]
    });
    // console.log(blob)
    return URL.createObjectURL(blob);
  } catch (err) {
    console.log('failed to get local src', err);
    // eslint-disable-next-line
    return Promise.reject()
  }
};

const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    // src.value = getLocalSrc()
    getLocalSrc()
      // eslint-disable-next-line
      .then(url => src.value = url)
  }
}, {
  threshold: 1,
  rootMargin: '200px',
});

onMounted(() => {
  if (placeholder.value) { observer.observe(placeholder.value); }
});

/* export default {
  name: 'ImageItem',

  props: ['url', 'styles'],

  setup(props) {
    const src = ref(null)
    const placeholder = ref(null)
    const img = ref(null)

    const getLocalSrc = async () => {
      //fetch from server
      try {
        const res = await fetch('https://viewer-img.herokuapp.com/', {
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
} */
</script>

<template>
  <img v-if="src" :src="src" :style="styles" alt="Poster">
  <div v-else class="placeholder" ref="placeholder"></div>
</template>

<style lang="scss" scoped>
@import '@/common.scss';

.placeholder {
  height: 100%;
  width: 100%;
  background-color: var(--secondary-color);
}
</style>
