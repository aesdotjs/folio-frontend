<template>
  <section
    id="hero"
    class="pb-[80%] min-h-screen w-full overflow-hidden relative parallax-container"
    data-scroll-section
  >
    <div class="bg-hero absolute inset-0" data-scroll data-scroll-speed="-9"></div>
    <StarGL class="absolute inset-0" data-scroll data-scroll-speed="-9"></StarGL>
    <div class="mtn" data-scroll data-scroll-speed="-8"></div>
    <div class="clouds" data-scroll data-scroll-speed="-7"></div>
    <div class="pl3" data-scroll data-scroll-speed="-6"></div>
    <div class="pl2" data-scroll data-scroll-speed="-4"></div>
    <div class="absolute bug-green" data-scroll data-scroll-speed="-4">
      <Bug type="hero's green"/>
    </div>
    <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2" data-scroll data-scroll-speed="2">
      <Bug type="hero's red"/>
    </div>
    <SnowGL
      :count="4000"
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
      class="absolute inset-0 w-full h-full pointer-events-none"
      data-scroll
      data-scroll-speed="-2"
    ></SnowGL>
    <div class="pl1"></div>
  </section>
</template>

<script setup>
import clouds from "~/assets/img/clouds.png";
import mountain from "~/assets/img/mountain.svg";
import parallax1 from "~/assets/img/parallax1.svg";
import parallax2 from "~/assets/img/parallax2.svg";
import parallax3 from "~/assets/img/parallax3.svg";
const { $bus } = useNuxtApp();
onMounted(() => {
  const preload = [clouds, mountain, parallax1, parallax2, parallax3];
  preload.forEach((el) => {
    let img = new Image();
    img.onload = function () {
      updateLoco();
    };
    img.src = el;
  });
});
const updateLoco = function () {
  $bus.$emit("update-locomotive");
};
</script>

<style lang="postcss" scoped>
.position-bottom {
  object-position: bottom;
}
.bug-green {
  bottom: 65px;
  left: calc(50% - 14px);
}
.bg-hero {
  background: linear-gradient(
    175.22deg,
    #200e4f 16.26%,
    #500366 32.71%,
    rgba(130, 0, 102, 0.88) 44.68%,
    #dc3c00 63.38%
  );
}
.clouds {
  position: absolute;
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: repeat-x;
  background-image: url("~/assets/img/clouds.png");
  animation: cloud-animation 10000s linear infinite alternate;
}

@keyframes cloud-animation {
  0% {
    background-position: 125% 0%;
  }
  100% {
    background-position: -200000px 0%;
  }
}

.mtn,
.pl1,
.pl2,
.pl3 {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
  pointer-events: none;
}

.mtn {
  background-image: url(~/assets/img/mountain.svg);
}
.pl1 {
  background-image: url(~/assets/img/parallax1.svg);
}
.pl2 {
  background-image: url(~/assets/img/parallax2.svg);
}
.pl3 {
  background-image: url(~/assets/img/parallax3.svg);
}
</style>
