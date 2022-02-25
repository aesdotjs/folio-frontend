<template>
  <div data-scroll-container ref="target">
    <slot></slot>
  </div>
</template>
<script setup>
import "locomotive-scroll/dist/locomotive-scroll.css";
const target = ref(null);
const state = useGlobalState();
const scroll = useLocomotive(target, (args) => {
  state.value.scrollY = args.scroll.y;
  // const {currentElements} = args;
  // for (const elemName in currentElements){
  //   console.log(currentElements[elemName].el.style.transform);
  // }
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
