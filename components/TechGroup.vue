<template>
  <div data-scroll data-scroll-offset="20%">
    <h2
      class="text-xl text-aeswhite font-retro filter-purple2 text-right transition-opacity opacity-0 inview-child:opacity-100"
    >
      {{ blok.title }}
    </h2>
    <div class="flex flex-wrap py-2 justify-end -mr-1">
      <Techno
        v-for="techno in blok.technos"
        :key="techno.content._uid"
        :blok="techno.content"
        class="techno"
      />
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.techno {
  @apply py-2 px-4 m-1 bg-aeswhite font-retro transition-all duration-150 transform scale-125 opacity-0 inview-child:scale-100 inview-child:opacity-100;
  text-shadow: 0 0 2px black;
}
</style>
<script setup>
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
</script>
