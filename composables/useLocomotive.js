import locomotiveScroll  from "locomotive-scroll";
export default function () {
  const scroll = reactive({});
  onMounted(() => {
    scroll = new locomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
      getDirection: true
    });
    scroll.stop();
  });
  onUnmounted(() => {
    scroll.destroy();
  });
  return {scroll};
}