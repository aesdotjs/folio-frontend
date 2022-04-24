<template>
  <transition name="fade">
    <div
      v-if="loading"
      class="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen loading bg-aesblue"
    >
      <svg
        class="logo-aes overflow-visible"
        data-name="Layer 1 copy 3"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 668.9 228.24"
        width="132"
        height="46"
      >
        <title>aes</title>
        <path
          class="cls-1 right"
          d="M617.76,106.2a10,10,0,0,0,9.9,8.72h31.23a9.91,9.91,0,0,0,10-10.8C663.34,46.18,614.28.49,555.05,0.49c-30.62,0-59.54,14.69-81,36.16L463.22,47.49a10,10,0,0,0,.05,14.22L579.52,176c-3.24,1.72-6.67,2.12-14.52,2.12-22.81,0-43.91-13.41-55.07-33.35l-0.1-.18a10,10,0,0,0-13.61-3.84l-27.07,15.15a10,10,0,0,0-3.84,13.61l0.1,0.18a114.12,114.12,0,0,0,180.23,25.08l10.62-10.59a10,10,0,0,0-.37-14.52L532.19,55.39a64.14,64.14,0,0,1,22.86-3.87A62.84,62.84,0,0,1,617.76,106.2Z"
        />
        <path
          class="cls-1"
          d="M444.75,155.92l-27-15.25a10,10,0,0,0-13.6,3.76l-0.12.22a64,64,0,0,1-55.28,32.57A63.09,63.09,0,1,1,374,56.3L333,96a10,10,0,0,0-.24,14.14l21.57,22.31a10,10,0,0,0,14.14.24l73.64-71.19a10,10,0,0,0,.36-14l-10.4-11.14a114,114,0,0,0-197.43,77.77c0,63,51.18,114.18,114.08,114.18,40.94,0,79.11-22.35,99.61-58.33l0.25-.45A10,10,0,0,0,444.75,155.92Z"
        />
        <path
          class="cls-1 left"
          d="M111.18,0.21A110.12,110.12,0,0,0,32.36,33a113,113,0,0,0-.29,158,109.74,109.74,0,0,0,78.75,33.07,10.09,10.09,0,0,0,10.11-10v-30a10.09,10.09,0,0,0-10.11-10c-33.5,0-60.8-27.88-60.8-62S77.56,50.2,111.32,50.2c33.93,0,60.6,27.13,60.6,61.77V214.1a9.67,9.67,0,0,0,9.78,9.82h30a10,10,0,0,0,10.22-9.82V112a112,112,0,0,0-32-78.85A109.4,109.4,0,0,0,111.18.21Z"
        />
      </svg>
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
<style lang="postcss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-leave-active {
  transition-delay: 200ms;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.logo-aes {
  animation: fadein 300ms forwards ease;
}

.logo-aes .left {
  animation: pulse-left 0.5s infinite alternate ease;

}
.logo-aes .right {
  animation: pulse-right 0.5s infinite alternate ease;
  animation-delay: 0.5s;
}
.cls-1 {
  fill: var(--color-aeswhite);
}
@keyframes fadein {
  from {
    opacity: 0;
    transform: scale(0.2);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes pulse-left {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-5rem);
  }
}
@keyframes pulse-right {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(5rem);
  }
}
</style>
