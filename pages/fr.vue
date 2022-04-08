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
onMounted(() => {
  useStoryBridge(home.story.id, event => {
    home.story = event
  }, {
    resolveRelations: ["techGroup.technos","WorkSection.works","work.technos"],
    language: "fr",
  });
  setTimeout(() => {
    const { scroll } = useLocomotive();
    scroll.value.update();
  }, 1000);
});
const pageSEO = home.story.content.body.find(i => i.component === "SEO");
useSEO(layout.story.content, pageSEO);
</script>
