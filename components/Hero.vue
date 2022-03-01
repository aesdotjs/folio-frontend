<template>
  <section 
    id="hero"
    class="pb-[80%] min-h-screen w-full overflow-hidden relative parallax-container"
    data-scroll-section>
    <div class="bg-hero absolute inset-0" data-scroll data-scroll-speed="-9"></div>
    <StarGL class="absolute top-0 h-2/3 w-full" data-scroll data-scroll-speed="-9"></StarGL>
    <div class="mtn" data-scroll data-scroll-speed="-8"></div>
    <div class="pl3" data-scroll data-scroll-speed="-7"></div>
    
    
    <div class="clouds" data-scroll data-scroll-speed="-6"></div>
    <div class="pl2" data-scroll data-scroll-speed="-4"></div>
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
      class="absolute inset-0 w-full h-full"
       data-scroll data-scroll-speed="-2"
    ></SnowGL>
    <div class="pl1">
    </div>
  </section>
</template>

<script setup>
import cloud from "~/assets/img/clouds.png";
import mountain from "~/assets/img/mountain.svg";
import parallax1 from "~/assets/img/parallax1.svg";
import parallax2 from "~/assets/img/parallax2.svg";
import parallax3 from "~/assets/img/parallax3.svg";
const { $bus } = useNuxtApp();
onMounted(() => {
  const preload = [
    cloud, mountain, parallax1, parallax2, parallax3
  ];
  preload.forEach(el => {
    
    let img = new Image ();
    img.onload = function () { updateLoco ()};
    img.src = el;
  });
})
const updateLoco = function() {
  $bus.$emit('update-locomotive');
};
</script>

<style lang="postcss" scoped>
.position-bottom {
  object-position: bottom;
}
.bg-hero {
  background: linear-gradient(180deg, #200E4F 13.24%, #500366 30.66%, rgba(130, 0, 102, 0.88) 43.34%, #DC3C00 57.33%);
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
.clouds-back{
  position: absolute;
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-image: url("~/assets/img/clouds-back.png");
}

@keyframes cloud-animation {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: -200000px 0%;
  }
}

.mtn, .pl1, .pl2, .pl3{
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
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