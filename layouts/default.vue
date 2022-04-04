<template>
  <div class="w-full bg-aeswhite">
    <NavBar :site="layout.story.content.site[0]" :routes="layout.story.content.routes"/>
    <SmoothScroll>
      <slot></slot>
    </SmoothScroll>
    <Footer :global="layout.story.content" />
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
const { layout } = await useGetLayout();
onMounted(() => {
  useStoryBridge(layout.story.id, story => (layout.story = story));
});
</script>