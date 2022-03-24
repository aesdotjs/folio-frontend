<template>
<section
    id="about"
    class="min-h-screen w-full relative py-32"
    data-scroll-section
  >
  <!-- <h1 class="text-2xl lg:text-4xl">{{ aboutSection.title }}</h1> -->
</section>
</template>

<script setup>
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
</script>