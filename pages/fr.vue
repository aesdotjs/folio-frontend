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
  useStoryBridge2(home.story.id, event => {
    console.log(event);
    home.story = event
  }, {
    resolveRelations: ["techgroup.technos","work.technos"],
  });
  setTimeout(() => {
    const { scroll } = useLocomotive();
    scroll.value.update();
  }, 1000);
});
const pageSEO = home.story.content.body.find(i => i.component === "SEO");
useSEO(layout.story.content, pageSEO);
</script>
