<template>
  <div
    v-editable="blok">
    <component
      v-for="blok in blok.body.filter(i => i.component !== 'SEO')"
      :key="blok._uid"
      :blok="blok"
      :is="blok.component" 
      data-scroll-section />
  </div>
</template>
 
<script setup>
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
</script>