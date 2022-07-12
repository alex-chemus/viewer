<script setup lang="ts">
import { computed, defineProps } from 'vue';
import Paragraph from '@/components/Paragraph/Paragraph.vue';
import { Content } from '@/types';

const props = defineProps<{
  data: any, // IPage
}>();

const badgeClasses = computed(() => {
  const cls = ['badge', 'ms-2'];
  if (props.data.imDbRating > 8) {
    cls.push('bg-success');
  } else if (props.data.imDbRating > 6) {
    cls.push('bg-warning');
    cls.push('text-dark');
  } else {
    cls.push('bg-danger');
  }
  return cls.join(' ');
});

const keyedGenres = computed(() => props.data.genreList
  .map((item: any, i: number) => ({ key: i, ...item })));

/* export default {
  name: 'PageContent',

  props: ['data', 'type'],

  components: { Paragraph },

  setup(props) {
    const getBadgeClasses = () => {
      let cls = ['badge', 'ms-2']
      if (props.data.imDbRating > 8) {
        cls.push('bg-success')
      } else if (props.data.imDbRating > 6) {
        cls.push('bg-warning')
        cls.push('text-dark')
      } else {
        cls.push('bg-danger')
      }
      return cls.join(' ')
    }

    const getKeyedGenres = () => {
      return props.data.genreList.map((item, i) => {
        item.key = i
        return item
      })
    }

    return { getBadgeClasses, getKeyedGenres }
  }
} */
</script>

<template>
  <div class="col content px-5 py-4">
    <h1 class="mb-4">{{ data.title }}</h1>

    <h5 class="mb-3">
      Rating:
      <span :class="badgeClasses">
        {{ data.imDbRating }}
      </span>
    </h5>

    <div class="wrapper mb-3">
      <h5 class="m-0">Genres:</h5>
      <p class="m-0 ms-2">
        <span
          v-for="genre in keyedGenres"
          :key="genre.key"
          class="badge bg-primary ms-2"
        >
          {{ genre.value }}
        </span>
      </p>
    </div>

    <h5>Description</h5>
    <p class="mb-3">{{ data.plot }}</p>

    <Paragraph
      v-if="data.year"
      title="Year"
      :data="(data.year as string)"
    />

    <Paragraph
      v-if="data.directors"
      title="Directors"
      :data="(data.directors as string)"
    />

    <Paragraph
      v-if="data.stars"
      title="Stars"
      :data="(data.stars as string)"
    />

    <Paragraph
      v-if="data.runtimeStr"
      title="Time"
      :data="(data.runtimeStr as string)"
    />

    <Paragraph
      v-if="data.companies"
      title="Companies"
      :data="(data.companies as string)"
    />

    <div v-if="data.boxOffice" class="mb-3">
      <h5 class="mb-2">Box Office:</h5>
      <p class="mb-1">Budget: {{ data.boxOffice.budget }}</p>
      <p>Cumulative Worlwide Gross: {{ data.boxOffice.cumulativeWorldwideGross }}</p>
    </div>

    <Paragraph
      v-if="data.countries"
      title="Countries"
      :data="data.countries"
    />
  </div>
</template>

<style lang="scss" scoped>
@import '@/common.scss';

.content {
  @media (max-width: 768px) {
    margin-top: -15vh !important;
    box-shadow: 0 -5vh 1.2rem rgba(0, 0, 0, .5);
    background-color: var(--main-bg-color);
  }
}

.wrapper {
  @include flex(flex-start, baseline);
}

/*p, h5, h1 {
  color: var(--text-color);
}*/
</style>
