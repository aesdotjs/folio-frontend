<template>
  <footer data-scroll-section class="bg-black text-white -mt-1 border-b-4 border-black">
    <div
      class="container flex items-center justify-center w-full p-6 mx-auto"
      data-scroll
    >
      <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
        <NuxtLink
          :to="{ name: route.name, hash: '#hero'}"
          class="flex items-center py-2 cursor-pointer mr-8"
          aria-label="Back to Top"
        >
          <BackToTop />
        </NuxtLink>
      </div>
      <NuxtLink
        :to="{ name: route.name, hash: '#hero'}"
        class="flex items-center py-2 cursor-pointer mr-8"
      >
        <img
          v-if="blok.site[0].siteIcon"
          :src="blok.site[0].siteIcon.filename"
          alt="aes's Logo"
          width="50"
          height="58"
        />
      </NuxtLink>
      <div>
        {{ blok.copyrightText }}
      </div>
    </div>
  </footer>
</template>
<script setup>
const props = defineProps({ blok: Object });
const route = useRoute();
</script>
