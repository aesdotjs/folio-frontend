<template>
  <section
    id="about"
    class="min-h-screen w-full relative -mt-8 pt-8 pb-32 bg-aesblue"
    :class="blok.cssClasses"
    data-scroll-section
  >
    <div class="container mx-auto px-4">
      <div class="flex justify-center">
        <h1
          v-if="blok.title"
          class="text-2xl lg:text-4xl text-aeswhite font-retro"
          :data-text="blok.title"
          :class="glitchClasses"
          data-scroll
          data-scroll-call="shuffleTitle"
          data-scroll-offset="100"
        >
          <span ref="shuffle">{{ blok.title }}</span>
        </h1>
      </div>
      <div class="flex flex-wrap items-stretch mt-16 -mx-2" data-scroll>
        <Service
          v-for="(service,i) in blok.services"
          :key="service._uid"
          :blok="service"
          class="w-full sm:w-1/2 lg:w-1/4 transition-opacity duration-300 opacity-0 inview-child:opacity-100"
          :style="{ transitionDelay : i * 150 + 'ms'}"
        />
      </div>
      <div class="flex flex-wrap mt-16">
        <MyselfSection v-if="blok.myselfSection" :blok="blok.myselfSection" class="w-full lg:w-2/5" />
        <div v-if="blok.techGroups.length > 0" class="w-full lg:w-3/5">

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import shuffleLetters from "shuffle-letters/dist/shuffle-letters.esm";
const shuffle = ref(null);
const glitchClasses = ref("");
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
console.log(props.blok);
const shuffleTitle = function () {
  shuffleLetters(shuffle.value, {
    onComplete: () => {
      glitchClasses.value = "hero glitch layers";
    },
  });
};
onMounted(() => {
  const { scroll } = useLocomotive();
  scroll.value.on("call", (value, way, obj) => {
    if (value === "shuffleTitle" && glitchClasses.value.length === 0) {
      shuffleTitle();
    }
  });
});
</script>
<style scoped>
.glitch span {
  animation: paths 5s step-end 1;
}

.glitch::before {
  animation: paths 5s step-end, opacity 5s step-end, font 5s step-end,
    movement 5s step-end;
}

.glitch::after {
  animation: paths 5s step-end, opacity 5s step-end, font 5s step-end,
    movement 5s step-end;
}
</style>
