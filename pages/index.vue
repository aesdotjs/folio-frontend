<template>
  <div>
    <SmoothScroll>
      <div id="sticky-nav-target"></div>
      <component
        :is="home.story.content.component"
        :key="home.story.content._uid"
        :blok="home.story.content"
      />
    </SmoothScroll>
    <BugToast />
  </div>
</template>

<script setup lang="ts">
const { layout } = await useGetLayout();
const { home } = await useGetHomePage();
onMounted(() => {
  useStoryBridge(home.story.id, event => {
    home.story = event
  })
});
const pageSEO = home.story.content.body.find(i => i.component === "SEO");
useSEO(layout.story.content, pageSEO);
</script>
