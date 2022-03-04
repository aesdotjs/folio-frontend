<template>
  <div>
    <SmoothScroll>
      <div id="sticky-nav-target"></div>
      <Hero />
      <div class="min-h-screen bg-aeswhite" data-scroll-section>
        <div class="flex flex-wrap">
          <Bug 
            v-for="id in [...Array(50).keys()]" 
            :key="id"
            :options="{
              color: `rgb(${Math.random() * 254 + 1},${Math.random() * 254 + 1},${Math.random() * 254 + 1})`,
              size: Math.random() * 3 + 2,
              orientation: 'top',
              rotate: `${Math.random() * 360 }deg`,
            }"
          />
          <Bug 
            v-for="id in [...Array(50).keys()]"
            :key="id"
            :options="{
              color: `rgb(${Math.random() * 254 + 1},${Math.random() * 254 + 1},${Math.random() * 254 + 1})`,
              size: Math.random() * 3 + 4,
              orientation: 'side',
            }"
          />
        </div>
      </div>
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
