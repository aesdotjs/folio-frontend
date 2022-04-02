<template>
  <transition name="fade">
    <div
      v-if="loading"
      class="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen loading bg-aesblue"
    >
      <SnowGL
      :count="4000"
      :size="1"
      :depth="80"
      :gravity="30"
      :wind="{
        current: 0,
        force: -0.1,
        target: -0.05,
        min: -0.01,
        max: -0.1,
        easing: 0.005,
      }"
      class="absolute inset-0 w-full h-full"
    ></SnowGL>
    </div>
  </transition>
</template>
<script setup>
const loading = useStateLoading();
</script>
<style lang="postcss">
/* body.is-loading {
  overflow: hidden;
}
.loading {
  background: linear-gradient(
    to top,
    #ffba96 9%,
    #f4ab94 31%,
    #d7848f 74%,
    #c3698c 100%
  );
}
.logo-loading {
  max-width: 17.5rem;
  width: 100%;
  padding: 30px;
  opacity: 0;
}
.loading .logo-loading .text-logo path {
  opacity: 0;
}

.loading .logo-loading .icon-svg path {
  stroke: transparent;
  stroke-width: 2px;
} */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-leave-active {
  transition-delay: 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
