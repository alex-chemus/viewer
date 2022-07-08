<script setup lang="ts">
import { Content } from '@/types';
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps<{
  data: any
}>()

interface Event {
  id: string,
  contentType: Content
}

const emit = defineEmits<{
  (e: 'remove', event: Event): void
}>()

const remove = (event: Event) => emit('remove', event)

const colorClasses = computed(() => {
  if (props.data.rating > 8)
    return 'bg-success badge m-0'
  else if (props.data.rating > 6)
    return 'bg-warning text-dark badge m-0'
  else
    return 'bg-danger badge m-0'
})

/*export default {
  name: 'WatchlistItem',

  props: ['data'],

  setup(props, ctx) {
    const remove = event => ctx.emit('remove', event)

    const dye = (rating) => {
      let colorClass
      if (rating > 8) colorClass = 'bg-success'
      else if (rating > 6) colorClass = 'bg-warning text-dark'
      else colorClass = 'bg-danger'
      return `badge ${colorClass} m-0`
    }

    return { remove, dye }
  }
}*/
</script>


<template>
  <li class="group-list-item mb-3 p-3">
    <div class="wrapper me-3">
      <h5 :title="data.title">
       {{ data.title }}
      </h5>
      <p :class="colorClasses">
        {{ data.rating }}
      </p>
    </div>

    <button @click="remove({ id: data.id, contentType: data.type as Content })" class="btn btn-danger">
      Remove
    </button>
  </li>
</template>


<style lang="scss" scoped>
@import '@/common.scss';

* {
  color: #262626;
}

li {
  @include flex(space-between, center);
  box-shadow: var(--shadow);
  background-color: #fbfbfb;
  border-radius: .5rem;
  min-width: 0;
  //border: 1px solid var(--secondary-color);
}

.wrapper {
  flex-shrink: 2;
  min-width: 0;
  min-height: 0 !important;
}

h5 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  //max-width: 50vw;
  min-width: 0;
  min-height: 0;
}
</style>