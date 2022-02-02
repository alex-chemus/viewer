<template>
  <li class="group-list-item mb-3 p-3">
    <div class="wrapper me-3">
      <h5 :title="data.title">
       {{ data.title }}
      </h5>
      <p :class="dye(data.rating)">
        {{ data.rating }}
      </p>
    </div>

    <button @click="remove({ id: data.id, type: data.type })" class="btn btn-danger">
      Remove
    </button>
  </li>
</template>


<script>
export default {
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
}
</script>


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