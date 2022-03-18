<template>
  <div>
    <SmoothScroll>
      <div id="sticky-nav-target"></div>
      <Hero :hero-section="homepage.heroSection"/>
      <About />
    </SmoothScroll>
    <BugToast />
  </div>
</template>

<script setup lang="ts">
const { data: globalData } = await useGetGlobal();
const global = globalData.value.data.attributes;
const { data: homepageData } = await useGetHomePage();
const homepage = homepageData.value.data.attributes;
useSEO(global, homepage);
</script>
