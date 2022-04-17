<template>
  <div
    v-editable="blok">
    test
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