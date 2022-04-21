<template>
  <div class="px-2 py-4" v-editable="blok">
    <div class="service-card drop-purple2">
      <img
        v-if="blok.icon"
        :src="blok.icon.filename"
        :alt="blok.icon.alt"
        width="64"
        heigh="64"
        class="w-16 h-16 object-contain text-center"
      />
      <h2 class="text-xl mt-4 font-semibold uppercase tracking-wide">{{ blok.name}}</h2>
      <div v-html="richText" class="mt-4 px-2"></div>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.service-card {
  @apply flex flex-col h-full items-center text-aesblue bg-aeswhite p-3;
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
