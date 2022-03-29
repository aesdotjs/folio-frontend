<template>
  <div class="p-2">
    <div class="service-card">
      <img
        v-if="blok.icon"
        :src="blok.icon.filename"
        :alt="blok.icon.alt"
        width="64"
        heigh="64"
        class="w-16 h-16 object-contain text-center"
      />
      <h2 class="text-xl mt-4">{{ blok.name}}</h2>
      <div v-html="richText" class="mt-4 px-2 text-sm"></div>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.service-card {
  @apply flex flex-col h-full items-center text-aesblue bg-aeswhite p-3 relative;
}
.service-card:before {
  content:'';
  position: absolute;
  top: 5px;
  left: -5px;
  width: 100%;
  height: 100%;
  z-index: -1;
  @apply bg-aespurple2;
}

</style>

<script setup>
const storyapi = useStoryApi();
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
const richText = computed(() => {
  return storyapi.richTextResolver.render(props.blok.content)
});
</script>
