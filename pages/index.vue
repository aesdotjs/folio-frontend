<template>
  <div>
    <SmoothScroll>
      <div id="sticky-nav-target"></div>
      <Hero />
      <div class="h-screen bg-aeswhite" data-scroll-section></div>
    </SmoothScroll>
  </div>
</template>

<script setup lang="ts">
const { data: globalData } = await useGetGlobal();
const global = globalData.value.data.attributes;
const { data: homepageData } = await useGetHomePage();
const homepage = homepageData.value.data.attributes;
useSEO(global, homepage);
</script>
