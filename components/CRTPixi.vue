<template>
  <div>
    <canvas ref="crtpixi" class="crt-pixi" />
    <div class="absolute visibility-hidden">
      <div v-for="bug in bugs" :key="bug._uid" :class="bug.gName">
        <Bug :options="bug" />
      </div>
    </div>
  </div>
</template>
<script setup>
const bugTypes = useStateBugTypes();
const bugsFound = useStateBugsFound();
const { scroll } = useLocomotive();
const { $PIXI, $CRTFilter, $SVG } = useNuxtApp();
const crtpixi = ref(null);
const pixiApp = reactive({});
let crtFilter;
let bugSprites = [];
let width, height;
const bugs = ref([]);
bugs.value = bugTypes.value.filter((i) => {
  return (
    bugsFound.value.findIndex((b) => b.gName === i.gName) === -1 &&
    i.gName.search("contact") > -1
  );
});
const initPixi = function () {
  width = crtpixi.value.offsetWidth;
  height = crtpixi.value.offsetHeight;
  pixiApp.value = new $PIXI.Application({
    width: width,
    height: height,
    view: crtpixi.value,
    resolution: 1,
    backgroundAlpha: 0,
    antialias: true,
  });
  const bugContainer = new $PIXI.Container();
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
      bugSprite.direction = Math.random() * Math.PI * 2;
      bugSprite.speed = 1 + Math.random();
      bugSprite.turnSpeed = Math.random() - 0.8;
      bugSprite.turnDir = 1;
      bugSprite.x = Math.random() * width;
      bugSprite.y = Math.random() * height;
      bugSprite.scale.set(bug.size / 20);
      bugSprite.bug = bug;
      bugSprite.opacity = 0.9;
      bugSprite.interactive = true;
      bugSprite.fearVal = 1;
      bugSprite.buttonMode = true;
      bugSprite.defaultCursor = "crosshair";
      bugSprite.on("mouseover", (e) => handleMouseOver(e, bugSprite));
      bugSprite.on("mouseout", (e) => handleMouseOut(e, bugSprite));
      bugSprite.on("click", (e) => handleMouseClick(e, bug, bugSprite));
      bugSprite.on("tap", (e) => handleMouseClick(e, bug, bugSprite));
      bugContainer.addChild(bugSprite);
      bugSprites = [...bugSprites, bugSprite];
    };
    image.src = blobURL;
  });
  const crtContainer = new $PIXI.Container();
  const fill = new $PIXI.Sprite.from($PIXI.Texture.WHITE);
  fill.width = width;
  fill.height = height;
  fill.tint = 0xffffff;
  fill.alpha = 0.06;
  crtContainer.addChild(fill);
  pixiApp.value.stage.addChild(bugContainer);
  pixiApp.value.stage.addChild(crtContainer);
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
    for (var i = 0; i < bugSprites.length; i++) {
      var bug = bugSprites[i];
      if (!bug.dying) {
        bug.fear && (bug.fearVal += 0.02);
        !bug.fear && bug.fearVal > 1 && (bug.fearVal -= 0.02);
        Math.random() < 0.0005 && (bug.turnDir *= -1);
        bug.direction += 0.01 * bug.turnSpeed * bug.turnDir;
        bug.x += Math.sin(bug.direction) * bug.speed * bug.fearVal;
        bug.y += Math.cos(bug.direction) * bug.speed * bug.fearVal;
        bug.rotation = -bug.direction - Math.PI;
        bug.x < 0 && (bug.x += width);
        bug.x > width && (bug.x -= width);
        bug.y < 0 && (bug.y += height);
        bug.y > height && (bug.y -= height);
      } else {
        bug.direction += bug.turnSpeed / 2;
        bug.rotation = -bug.direction - Math.PI;
        if(bug.scale.x < 0.001) {
          bugContainer.removeChild(bug);
        }
        else {
          bug.scale.x -= 0.001;
          bug.scale.y -= 0.001;
        }
      }
    }
  });
};
const resizePixi = function () {
  if (!pixiApp.value) return;
  width = crtpixi.value.offsetWidth;
  height = crtpixi.value.offsetHeight;
  pixiApp.value.renderer.resize(width, height);
  pixiApp.value.resize(width, height);
};
const handleMouseOver = (event, bugSprite) => {
  bugSprite.fear = true;
  bugSprite.turnDir *= -1;
};
const handleMouseOut = (event, bugSprite) => {
  setTimeout(() => {
    bugSprite.fear = false;
  }, 150);
};
const handleMouseClick = (event, bug, bugSprite) => {
  if(bugSprite.dying) return;
  useBugFound(bug);
  bugSprite.dying = true;
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
}
</style>
