export default function (el, onScroll = false) {
  const scroll = shallowReactive({});
  const nuxtApp = useNuxtApp();
  onMounted(() => {
    nextTick(() => {
      scroll.value = new nuxtApp.$locomotiveScroll({
        el: el.value,
        smooth: true,
        getDirection: true,
        multiplier: 0.8,
        mobile: {
          breakpoint: 0,
          smooth: false,
          getDirection: true,
        },
        tablet: {
          breakpoint: 0,
          smooth: false,
          getDirection: true,
        },
      });
      if(onScroll) scroll.value.on("scroll", onScroll)
    });    
  });
  onUnmounted(() => {
    scroll.value.destroy();
  });
  return scroll;
}