<template>
  <div>
    <SmoothScroll>
      <Hero />
      <div class="h-screen"></div>
    </SmoothScroll>
  </div>
</template>

<script setup lang="ts">
import "locomotive-scroll/dist/locomotive-scroll.css";
const { data: globalData } = await useGetGlobal();
const global = globalData.value.data.attributes;
const { data: homepageData } = await useGetHomePage();
const homepage = homepageData.value.data.attributes;
useSEO(global, homepage);
//const {scroll} = useLocomotive();
</script>
