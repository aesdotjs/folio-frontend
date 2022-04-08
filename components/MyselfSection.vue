<template>
  <div class="flex flex-col text-aeswhite text-justify">
    <h2
      class="font-retro text-2xl lg:text-3xl filter-purple2 text-center transition-opacity opacity-0 inview:opacity-100"
      data-scroll
      data-scroll-offset="20%"
    >
      {{ blok.title }}
    </h2>
    <div class="mt-12">
      <div
        class="drop-purple2 mx-auto w-1/2 mb-12 sm:mb-2 sm:w-1/3 sm:float-left sm:mr-4 sm:ml-0 transition-opacity opacity-0 inview:opacity-100"
        data-scroll
      >
        <img
          :src="blok.photo.filename"
          :alt="blok.photo.alt"
          class="border-4 border-aeswhite"
        />
      </div>
      <div
        v-html="richText"
        class="transition-opacity delay-150 opacity-0 inview:opacity-100"
        data-scroll
      ></div>
    </div>
  </div>
</template>
<script setup>
const storyapi = useStoryApi();
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
const richText = computed(() => {
  return storyapi.richTextResolver.render(props.blok.content);
});
</script>
