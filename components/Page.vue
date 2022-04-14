<template>
  <div
    v-editable="blok">
    <component
      v-for="blok in blok.body"
      :key="blok._uid"
      :blok="blok"
      :is="blok.component" />
  </div>
</template>
 
<script setup>
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
console.log(props.blok)
</script>