<template>
  <canvas
    ref="heropixi"
    class="hero-pixi"
    data-scroll
    data-scroll-id="heropixi"
    data-scroll-offset="100%,-20%"
  />
  <SnowGL
    :count="4090"
    :size="1"
    :depth="80"
    :gravity="30"
    :wind="{
      current: 0,
      force: -0.1,
      target: -0.05,
      min: -0.01,
      max: -0.1,
      easing: 0.005,
    }"
    class="top-0 absolute w-full h-full pointer-events-none"
  ></SnowGL>
  <ClientOnly>
    <div class="absolute visibility-hidden top-0 -left-full">
      <div v-for="bug in bugs" :key="bug._uid" :class="bug.gName">
        <Bug :options="bug" />
      </div>
    </div>
  </ClientOnly>
</template>
<script setup>
import cloudsPNG from "~/assets/img/clouds.png";
import cloudsBackPNG from "~/assets/img/clouds-back.png";
import mountainSVG from "~/assets/img/mountain.svg?url";
import parallax1SVG from "~/assets/img/parallax1.svg?url";
import parallax2SVG from "~/assets/img/parallax2.svg?url";
import parallax3SVG from "~/assets/img/parallax3.svg?url";
import starFragment from "./shaders/star.frag";
const loading = useStateLoading();
const props = defineProps({
  ratio: {
    type: Number,
    required: true,
    default: 1,
  },
  perspective: {
    type: Number,
    default: 2.2,
  },
});
const bugTypes = useStateBugTypes();
const bugsFound = useStateBugsFound();
const { scroll } = useLocomotive();
const gameWidth = 1920;
const gameHeight = 1534;
const { $PIXI, $PixelateFilter } = useNuxtApp();
const heropixi = ref(null);
const pixiApp = reactive({});
let starFilter, pixelateFilter;
let bugSprites = [];
const bugs = ref([]);
bugs.value = bugTypes.value.filter((i) => {
  return (
    bugsFound.value.findIndex((b) => b.gName === i.gName) === -1 &&
    i.gName.search("hero") > -1
  );
});
const hasFoundAllBugs = computed(() => bugsFound.value.length === bugTypes.value.length);
const initPixi = function () {
  const width = gameWidth;
  const height = gameHeight;
  pixiApp.value = new $PIXI.Application({
    width: width,
    height: height,
    view: heropixi.value,
    resolution: 1,
    backgroundAlpha: 0,
    antialias: true,
  });
  const loader = $PIXI.Loader.shared;
  const parallaxContainer = new $PIXI.Container();

  const parallaxLayerSky = new $PIXI.Container();
  const bgTex = drawDiagonalGrad(bgColors, 172.2, width, height);
  const bg = new $PIXI.Sprite(bgTex);
  bg.width = width;
  bg.height = height;
  parallaxLayerSky.addChild(bg);

  const starSprite = new $PIXI.Sprite();
  starSprite.width = width;
  starSprite.height = height;
  starFilter = new $PIXI.Filter(null, starFragment, { time: 0.0 });
  starSprite.filters = [starFilter];
  parallaxLayerSky.addChild(starSprite);

  const parallaxLayerMountain = new $PIXI.Container();
  const cloudsBack = new $PIXI.Sprite(loader.resources.cloudsBackPNG.texture);
  cloudsBack.width = width;
  cloudsBack.height = 1130;
  cloudsBack.opacity = 0.5;
  parallaxLayerMountain.addChild(cloudsBack);
  const mountain = new $PIXI.Sprite(loader.resources.mountainSVG.texture);
  mountain.width = width;
  mountain.height = height;
  parallaxLayerMountain.addChild(mountain);

  const parallaxLayerClouds = new $PIXI.Container();
  const cloudsStrip = new $PIXI.TilingSprite(
    loader.resources.cloudsPNG.texture,
    width,
    height
  );
  cloudsStrip.width = width;
  cloudsStrip.height = (height * 4) / 5;
  cloudsStrip.tileScale.x = 1;
  cloudsStrip.tileScale.y = 1;
  cloudsStrip.tilePosition.x = -width / 2;
  parallaxLayerClouds.addChild(cloudsStrip);

  const parallaxLayerPl3 = new $PIXI.Container();
  const pl3 = new $PIXI.Sprite(loader.resources.parallax3SVG.texture);
  pl3.width = width;
  pl3.height = height;
  parallaxLayerPl3.addChild(pl3);

  const parallaxLayerPl2 = new $PIXI.Container();
  const pl2 = new $PIXI.Sprite(loader.resources.parallax2SVG.texture);
  pl2.width = width;
  pl2.height = height;
  parallaxLayerPl2.addChild(pl2);

  bugs.value.forEach((bug) => {
    const svgElement = document.querySelector(`.${bug.gName} svg`);
    const { width: svgWidth, height: svgHeight } = svgElement.getBBox();
    const clonedSvgElement = svgElement.cloneNode(true);
    const outerHTML = clonedSvgElement.outerHTML,
      blob = new Blob([outerHTML], { type: "image/svg+xml;charset=utf-8" });
    const URL = window.URL || window.webkitURL || window;
    const blobURL = URL.createObjectURL(blob);
    const image = new Image();
    image.onload = () => {
      let canvas = document.createElement("canvas");
      canvas.width = svgWidth;
      canvas.height = svgHeight;
      let context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, svgWidth, svgHeight);
      const bugSprite = new $PIXI.Sprite($PIXI.Texture.from(canvas));
      bugSprite.anchor.set(0.5);
      bugSprite.pivot.set(0.5);
      if(bug.gName === "hero-white"){
        bugSprite.x = width / 2 - 50;
        bugSprite.y = height - 150;
        bugSprite.scale.set(0.5);
      }
      if(bug.gName ==="hero-green"){
        bugSprite.y = height - 400;
        bugSprite.x = width / 2 - 70;
        bugSprite.scale.set(0.22);
        bugSprite.rotation = 0.23;
      }
      bugSprite.bug = bug;
      bugSprite.interactive = true;
      bugSprite.fearVal = 1;
      bugSprite.buttonMode = true;
      bugSprite.defaultCursor = "crosshair";
      bugSprite.on("click", (e) => handleMouseClick(e, bug, bugSprite));
      bugSprite.on("tap", (e) => handleMouseClick(e, bug, bugSprite));
      parallaxLayerPl2.addChild(bugSprite);
      bugSprites = [...bugSprites, bugSprite];
    };
    image.src = blobURL;
  });

  const parallaxLayerPl1 = new $PIXI.Container();
  const pl1 = new $PIXI.Sprite(loader.resources.parallax1SVG.texture);
  pl1.width = width;
  pl1.height = height;
  parallaxLayerPl1.addChild(pl1);
  const fill = new $PIXI.Sprite.from($PIXI.Texture.WHITE);
  fill.width = width;
  fill.height = height;
  fill.position.y = height;
  fill.tint = 0xffe3d8;
  parallaxLayerPl1.addChild(fill);

  parallaxContainer.addChild(parallaxLayerSky);
  parallaxContainer.addChild(parallaxLayerMountain);
  parallaxContainer.addChild(parallaxLayerClouds);
  parallaxContainer.addChild(parallaxLayerPl3);
  parallaxContainer.addChild(parallaxLayerPl2);
  parallaxContainer.addChild(parallaxLayerPl1);
  pixelateFilter = new $PixelateFilter(hasFoundAllBugs.value ? 1 : props.ratio);
  pixiApp.value.stage.filters = [pixelateFilter];
  pixiApp.value.stage.addChild(parallaxContainer);
  const parallaxContext = {
    container: parallaxContainer,
    position: { x: 0, y: 0 },
    layer: [
      { container: parallaxLayerSky, weight: 0.05 },
      { container: parallaxLayerMountain, weight: 0.1 },
      { container: parallaxLayerClouds, weight: 0.3 },
      { container: parallaxLayerPl3, weight: 0.4 },
      { container: parallaxLayerPl2, weight: 0.6 },
      { container: parallaxLayerPl1, weight: 0.9 },
    ],
    setPosition: function (y) {
      this.layer.forEach((layer) => {
        let posX = layer.container.position.x;
        let posY = y * layer.weight;
        layer.container.position.set(posX, posY);
      });
    },
  };
  let time = 0;
  pixiApp.value.ticker.add((elapsedTime) => {
    let deltaTime = elapsedTime / 180;
    time += deltaTime;
    const scale = height / props.perspective;
    const progress = scroll.value.scroll.currentElements["heropixi"]?.progress || 0.0001;
    parallaxContext.setPosition((1 - progress) * scale - scale);
    cloudsStrip.tilePosition.x -= elapsedTime * 0.2;
    starFilter.uniforms.time += elapsedTime * 0.002;

    for (var i = 0; i < bugSprites.length; i++) {
      var bug = bugSprites[i];
      if(bug.dying && bug.bug.gName === "hero-white"){
        bug.y += elapsedTime * 5;
        if(bug.y > height) {
          parallaxLayerPl2.removeChild(bug);
        }
      }
      if(bug.dying && bug.bug.gName === "hero-green"){
        if(bug.x < 100) {
          parallaxLayerPl2.removeChild(bug);
        }
        else {
          bug.x -= Math.cos(bug.rotation) * elapsedTime * 5;
          bug.y -= Math.sin(bug.rotation) * elapsedTime * 5;
        }
      }
    }
    const step = 0.009;
    if(pixelateFilter.uniforms.size[0] >= 1 + step && hasFoundAllBugs.value){
      pixelateFilter.uniforms.size[0]-= step;
      pixelateFilter.uniforms.size[1]-= step;
    }
  });
  loading.value = false;
  scroll.value.update();
  resizePixi();
};
const resizePixi = function () {
  // Determine which screen dimension is most constrained
  if(!pixiApp.value) return;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const imageRatio = gameWidth / gameHeight;
  const windowRatio = windowWidth / windowHeight;
  if (windowRatio > imageRatio) {
    heropixi.value.width = windowWidth;
  } else {
    heropixi.value.width = gameWidth / (gameHeight / windowHeight);
  }
  const ratio = Math.min(1, heropixi.value.width / gameHeight);
  heropixi.value.height = ratio * gameHeight;
  pixiApp.value.stage.scale.x = pixiApp.value.stage.scale.y = ratio;
  pixiApp.value.stage.position.x = (windowWidth - heropixi.value.width) / 2;
  if (windowWidth > gameWidth) {
    pixiApp.value.stage.width = windowWidth;
    pixiApp.value.renderer.resize(windowWidth, gameHeight);
  }
  const { scroll } = useLocomotive();
  scroll.value.update();
};

const handleMouseClick = (event, bug, bugSprite) => {
  if(bugSprite.dying) return;
  useBugFound(bug);
  bugSprite.dying = true;
};

const bgColors = [
  {
    stop: 0.1626,
    color: "#200e4f",
  },
  {
    stop: 0.3271,
    color: "#500366",
  },
  {
    stop: 0.4468,
    color: "rgba(130, 0, 102, 0.88)",
  },
  {
    stop: 0.5338,
    color: "#dc3c00",
  },
];
const drawDiagonalGrad = function (colors, angDeg, w, h) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  var cssAng = angDeg;
  var cx = w / 2,
    cy = h / 2;
  var canAng = cssAng - 90;
  var ang = (canAng - 90) * (Math.PI / 180);
  var hypt = cy / Math.cos(ang);
  var fromTopRight = cx - Math.sqrt(hypt * hypt - cy * cy);
  var diag = Math.sin(ang) * fromTopRight;
  var len = hypt + diag;

  var topX = cx + Math.cos(-Math.PI / 2 + ang) * len;
  var topY = cy + Math.sin(-Math.PI / 2 + ang) * len;
  var botX = cx + Math.cos(Math.PI / 2 + ang) * len;
  var botY = cy + Math.sin(Math.PI / 2 + ang) * len;

  var grad = ctx.createLinearGradient(topX, topY, botX, botY);
  colors.forEach((color) => {
    grad.addColorStop(color.stop, color.color);
  });

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  return new $PIXI.Texture.from(c);
};
onMounted(() => {
  const loader = $PIXI.Loader.shared;
  const assets = { cloudsPNG, cloudsBackPNG, mountainSVG, parallax1SVG, parallax2SVG, parallax3SVG };
  for (const [key, value] of Object.entries(assets)) {
    if (!loader.resources[key]) loader.add(key, value);
  }
  loading.value = true;
  loader.load(initPixi);
  window.addEventListener("resize", resizePixi);
});

onUnmounted(() => {
  window.removeEventListener("resize", resizePixi);
  pixiApp.value.destroy(false);
});

watch(
  () => props.ratio,
  () => {
    pixiApp.value.destroy(false);
    initPixi();
  }
);
</script>

<style lang="postcss" scoped>
.hero-pixi {
  image-rendering: pixelated;
}
</style>
