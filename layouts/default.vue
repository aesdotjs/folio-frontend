<template>
  <div class="w-full text-bwhite bg-bwhite">
    <NavBar :global="global" />
    <slot />
    <Footer :global="global" />
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