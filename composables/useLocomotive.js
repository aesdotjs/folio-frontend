const scroll = reactive({});
function initLocomotive(el, onScroll = false) {
  const nuxtApp = useNuxtApp();
  onMounted(() => {
    nextTick(() => {
      scroll.value = new nuxtApp.$locomotiveScroll({
        el: el.value,
        smooth: true,
        getDirection: true,
        multiplier: 1,
        mobile: {
          breakpoint: 0,
          smooth: true,
        },
        tablet: {
          breakpoint: 0,
          smooth: true,
        },
      });
      if(onScroll) scroll.value.on("scroll", onScroll);
    });
  });
  onUnmounted(() => { 
    scroll.value.destroy();
  });
  return scroll;
}
export default function () {
  return {
    scroll,
    initLocomotive
  }; 
}