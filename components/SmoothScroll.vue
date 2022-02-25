<template>
  <div data-scroll-container ref="target">
    <slot></slot>
  </div>
</template>
<script setup>
import "locomotive-scroll/dist/locomotive-scroll.css";
const target = ref(null);
const scroll = useLocomotive(target, (obj) => {

});
const { $bus } = useNuxtApp()
onMounted(() => {
  $bus.$on('update-locomotive', () => {
    nextTick(() => {
      scroll.value.update();
    });
  });
});

</script>
