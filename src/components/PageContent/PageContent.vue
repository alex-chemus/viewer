<template>
  <div class="col content p-4">
    <h1 class="mb-3">{{ data.title }}</h1>
    <h5>
      Rating:
      <span :class="getBadgeClasses(data.imDbRating)">
        {{ data.imDbRating }}
      </span>
    </h5>
    <h5>
      Genres:
      <!-- <span v-for="genre in data.genres"></span> -->
    </h5>
  </div>
</template>


<script>
export default {
  name: 'PageContent',

  props: ['data'],

  setup() {
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

    return { getBadgeClasses }
  }
}
</script>


<style lang="scss" scoped>
  @import '@/common.scss';

  .content {
    @media (max-width: 768px) {
      //border: 1px solid green;
      margin-top: -15vh !important;
      //box-shadow: var(--large-shadow);
      box-shadow: 0 -5vh 1.2rem rgba(0, 0, 0, .5);
      background-color: var(--main-bg-color);
    }
  }
</style>