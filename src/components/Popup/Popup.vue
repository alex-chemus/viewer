<template>
  <div class="popup">
    <!-- <Loader v-if="isLoading === 'true'" size="70" /> -->
    <div v-if="isLoading === 'true'" class="loader-container">
      <Loader size="70" />
    </div>

    <h1 v-else-if="isLoading === 'false'">
      Data loaded
    </h1>
  </div>
</template>


<script>
import Loader from '@/components/Loader/Loader.vue'

export default {
  name: 'Popup',

  props: ['searchedList', 'isLoading'],

  components: { Loader }
}
</script>


<style lang="scss" scoped>
@import '@/common.scss';

.popup {
  width: 100%;
  min-height: 100px;
  background: white;
  position: absolute;
  top: 110%;
  left: 0;
  z-index: 1;
  border-radius: .25rem;
}

.loader-container {
  width: 100%;
  //height: 100%;
  @include flex(center, center);
  //margin: 0 auto;
  padding-top: 15px;
}
</style>