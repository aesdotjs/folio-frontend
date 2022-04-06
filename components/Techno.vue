<template>
  <div :style="{ backgroundColor: blok.color.color, color: shadedColor, transitionDelay: `${Math.random() * 300 + 150}ms` }">
    {{ blok.name }}
  </div>
</template>
<script setup>
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
const shadedColor = computed(() => shadeColor(props.blok.color.color, 245));
</script>