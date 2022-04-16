<template>
  <div class="w-full bg-aeswhite">
    <NavBar
      v-if="layout.story"
      :site="layout.story.content.site[0]"
      :routes="layout.story.content.routes"
    />
    <SmoothScroll>
      <slot></slot>
      <Footer v-if="layout.story" :blok="layout.story.content" />
    </SmoothScroll>
    <BugToast />
    <div class="hidden">
      <BugSvg />
    </div>
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

<script setup>
const route = useRoute();
const lg = computed(() => route.path.split("/")[1]);
const { layout, fetchLayout } = await useGetLayout(lg.value);
watch(route, () => {
  fetchLayout(lg.value);
});
// onMounted(() => {
//   useStoryBridge2(layout.story.id, (story) => (layout.story = story));
// });
</script>
