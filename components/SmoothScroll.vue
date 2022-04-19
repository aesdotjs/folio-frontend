<template>
  <div data-scroll-container ref="target">
    <slot></slot>
  </div>
</template>
<script setup>
import "locomotive-scroll/dist/locomotive-scroll.css";
const target = ref(null);
const scrollY = useStateScrollY();
const elementsInViewport = useStateElementsInViewport();
const { initLocomotive } = useLocomotive();
const scroll = initLocomotive(target, (args) => {
  scrollY.value = args.scroll.y;
  elementsInViewport.value = Object.keys(args.currentElements);
});

</script>
<style>
[data-scroll-container] {
  perspective : 1px;
}
</style>
