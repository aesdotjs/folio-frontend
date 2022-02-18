<template>
  <div class="w-full text-bwhite bg-bwhite">
    <NavBar />
    <!-- <div
      v-if="!hasLoaded"
      class="fixed inset-0 z-40 flex items-center justify-center w-screen h-screen loading"
    >
      <div class="absolute bottom-0 w-full loading-img -z-10">
        <img
          src="~assets/img/loading-img.svg"
          class="object-cover"
          alt="Loading image"
        />
      </div>
    </div> -->
    <slot />
    <Footer :socials="global.socials" />
  </div>
</template>
<style lang="postcss">
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s cubic-bezier(0.2, 0.5, 0.1, 1);
}

.page-enter,
.page-leave-active {
  opacity: 0;
}
</style>

<script setup lang="ts">
const { data: globalData } = await useGetGlobal();
const global = globalData.value.data.attributes;

</script>