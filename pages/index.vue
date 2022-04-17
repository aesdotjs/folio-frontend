<template>
  <div>test</div>
</template>

<script setup>
const { layout } = await useGetLayout();
const { home } = await useGetHomePage();
onMounted(() => {
  useStoryBridge2(home.story.id, event => {
    home.story = event
  }, {
    resolveRelations: ["Techgroup.technos","Work.technos"],
  });
  setTimeout(() => {
    const { scroll } = useLocomotive();
    scroll.value.update();
  }, 1000);
});
const pageSEO = home.story.content.body.find(i => i.component === "SEO");
useSEO(layout.story.content, pageSEO);
</script>
