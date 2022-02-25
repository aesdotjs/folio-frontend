export default function (el, onScroll = false) {
  const scroll = reactive({});
  const nuxtApp = useNuxtApp();
  onMounted(() => {
    nextTick(() => {
      scroll.value = new nuxtApp.$locomotiveScroll({
        el: el.value,
        smooth: true,
        getDirection: true,
      });
      if(onScroll) scroll.value.on("scroll", onScroll)
    });    
  });
  onUnmounted(() => {
    scroll.value.destroy();
  });
  return scroll;
}