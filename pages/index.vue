<template>
  <component
    :is="home.story.content.component"
    :key="home.story.content._uid"
    :blok="home.story.content"
  />
</template>

<script setup>
const { layout } = await useGetLayout();
const { home } = await useGetHomePage();
const lg = useStateLanguage();
lg.value = "";
onMounted(() => {
  useStoryBridge(home.story.id, event => {
    home.story = event
  }, {
    resolveRelations: ["TechGroup.technos","Work.technos"],
  });
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
    const { scroll } = useLocomotive();
    scroll.value.update();
  }, 1500);
});
const pageSEO = home.story.content.body.find(i => i.component === "SEO");
useSEO(layout.story.content, pageSEO, "en");
</script>
