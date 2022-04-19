<template>
  <canvas
    ref="crtpixi"
    class="crt-pixi"
  />
</template>
<script setup>
const { scroll } = useLocomotive();
const { $PIXI, $CRTFilter } = useNuxtApp();
const crtpixi = ref(null);
const pixiApp = reactive({});
let crtFilter;
const initPixi = function () {
  const width = crtpixi.value.offsetWidth;
  const height = crtpixi.value.offsetHeight;
  pixiApp.value = new $PIXI.Application({
    width: width,
    height: height,
    view: crtpixi.value,
    resolution: 1,
    backgroundAlpha: 0,
    antialias: true,
  });
  const container = new $PIXI.Container();
  const fill = new $PIXI.Sprite.from($PIXI.Texture.WHITE);
  fill.width = width;
  fill.height = height;
  fill.tint = 0xffffff;
  fill.alpha = 0.06;
  container.addChild(fill);
  pixiApp.value.stage.addChild(container);
  crtFilter = new $CRTFilter({
    curvature: 2.4,
    lineWidth: 4.1,
    lineContrast: 0.5,
    verticalLine: false,
    noise: 0.02,
    noiseSize: 1.9,
    seed: 0.008,
    vignetting: 0.458,
    vignettingAlpha: 0.924,
    vignettingBlur: 0.3,
    time: 0.0,
    animating: true,
  });
  pixiApp.value.stage.filters = [crtFilter];
  resizePixi();
  pixiApp.value.ticker.add((elapsedTime) => {
    crtFilter.seed = Math.random();
    crtFilter.time += elapsedTime;
  });
};
const resizePixi = function () {
  if(!pixiApp.value) return;
  const width = crtpixi.value.offsetWidth;
  const height = crtpixi.value.offsetHeight;
  pixiApp.value.renderer.resize(width,height);
  pixiApp.value.resize(width,height);
};

onMounted(() => {
  setTimeout(() => {
    initPixi();
  }, 1000);
  window.addEventListener("resize", resizePixi);
});

onUnmounted(() => {
  window.removeEventListener("resize", resizePixi);
  pixiApp.value.destroy(false);
});
</script>
<style scoped>
.crt-pixi {
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
