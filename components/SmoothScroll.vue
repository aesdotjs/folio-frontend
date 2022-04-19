<template>
  <div data-scroll-container ref="target">
    <slot></slot>
  </div>
</template>
<script setup>
import "locomotive-scroll/dist/locomotive-scroll.css";
const target = ref(null);
const scrollY = useStateScrollY();
const { initLocomotive } = useLocomotive();
const scroll = initLocomotive(target, (args) => {
  scrollY.value = args.scroll.y;
});

</script>
<style>
[data-scroll-container] {
  perspective : 1px;
}
</style>
