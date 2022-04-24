<template>
  <div class="mt-12 lg:mt-0" data-scroll data-scroll-offset="20%">
    <h2
      class="text-xl text-aeswhite font-retro filter-purple2-s text-center lg:text-right transition-opacity opacity-0 inview-child:opacity-100"
    >
      {{ blok.title }}
    </h2>
    <div class="flex flex-wrap py-2 justify-center sm:justify-end relative">
      <div v-if="!hasAboutTechnoBugBeenFound && blok._uid === '3ee0b5fd-8d05-4187-90f5-f4aacde92913'" class="absolute left-0 top-5 hideandshow">
        <Bug slug="about-techno" :beacon="true"/>
      </div>
      <Techno
        v-for="techno in blok.technos.filter(i => i.content)"
        :key="techno.content._uid"
        :blok="techno.content"
        class="techno"
      />
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.techno {
  @apply py-2 px-6 m-px bg-aeswhite flex-1 text-center font-retro transition-all duration-150 transform scale-125 opacity-0 inview-child:scale-100 inview-child:opacity-100;
  text-shadow: 0 0 2px black;
}

.hideandshow {
  animation: hideandshow 10s infinite;
}
@keyframes hideandshow {
  0% {
    transform: translateX(0);
  }
  30% {
    transform: translateX(-50%);
  }
  70% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
<script setup>
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
const bugsFound = useStateBugsFound();
const hasAboutTechnoBugBeenFound = computed(() => bugsFound.value.findIndex((i) => i.gName === "about-techno") > -1);
</script>
