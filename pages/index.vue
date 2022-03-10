<template>
  <div>
    <SmoothScroll>
      <div id="sticky-nav-target"></div>
      <Hero />
      <div class="min-h-screen bg-aeswhite" data-scroll-section>
        <div class="flex flex-wrap">
          <Bug type="red1"/>
          <Bug type="blue1"/>
          <Bug type="green1"/>
        </div>
      </div>
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
