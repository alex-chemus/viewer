<template>
  <div class="wrapper">
    <div class="lds-ripple">
      <div></div>
      <div></div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Loader'
}
</script>

<style lang="scss" scoped>
  @import '@/common.scss';

  .wrapper {
    @include flex(center, center);
  }

  .lds-ripple {
    height: 100%;
    margin: 0 auto;
    display: inline-block;
    position: relative;
    width: 180px;
    height: 180px;
    //background: black;
  }

  .lds-ripple div {
    position: absolute;
    border: 4px solid $primary;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  .lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
  }

  @keyframes lds-ripple {
    0% {
      //top: 36px;
      top: 50%;
      //left: 36px;
      left: 50%;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      //width: 172px;
      width: 100%;
      height: 100%;
      //height: 172px;
      opacity: 0;
    }
  }
</style>