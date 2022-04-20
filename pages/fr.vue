<template>
  <component
    :is="home.story.content.component"
    :key="home.story.content._uid"
    :blok="home.story.content"
  />
</template>

<script setup>
const { layout } = await useGetLayout("fr");
const { home } = await useGetHomePage("fr");
const lg = useStateLanguage();
lg.value = "fr";
onMounted(() => {
  useStoryBridge(home.story.id, event => {
    home.story = event
  }, {
    resolveRelations: ["TechGroup.technos","Work.technos"],
  });
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 1500);
});
const pageSEO = home.story.content.body.find(i => i.component === "SEO");
useSEO(layout.story.content, pageSEO);
</script>
