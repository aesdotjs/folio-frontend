<template>
  <section
    id="about"
    class="min-h-screen w-full relative pt-8 pb-32"
    :class="blok.class"
    data-scroll-section
    data-scroll
    data-scroll-id="about"
    data-scroll-class="about-inview"
    v-editable="blok"
  >
    <div class="container mx-auto px-6">
      <div class="flex justify-center">
        <h1
          v-if="blok.title"
          class="text-2xl lg:text-4xl text-aeswhite font-retro filter-purple2"
          :data-text="blok.title"
          :class="glitchClasses"
          data-scroll
          data-scroll-offset="20%"
          data-scroll-call="shuffleTitleAbout"
        >
          <span ref="shuffle">{{ blok.title }}</span>
        </h1>
      </div>
      <div class="flex flex-wrap items-stretch mt-16 -mx-2">
        <Service
          v-for="(service, i) in blok.services"
          :key="service._uid"
          :blok="service"
          class="service"
          :style="{ '--i': i + 1 }"
          :curId="i"
          data-scroll
          data-scroll-offset="30%"
        />
      </div>
      <div class="flex flex-wrap mt-8">
        <MyselfSection
          v-if="blok.myselfSection[0]"
          :blok="blok.myselfSection[0]"
          class="w-full lg:w-1/2 lg:pr-12"
        />
        <div v-if="blok.techgroups.length > 0" class="w-full lg:w-1/2 flex flex-col lg:pl-12">
          <TechGroup
            v-editable="techgroup"
            v-for="(techgroup, id) in blok.techgroups"
            :key="techgroup._uid"
            :blok="techgroup"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import shuffleLetters from "shuffle-letters/dist/shuffle-letters.esm";
const shuffle = ref(null);
const glitchClasses = ref("opacity-0");
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

const shuffleTitle = function () {
  if (!shuffle.value) return;
  glitchClasses.value = "opacity-100";
  shuffleLetters(shuffle.value);
};
onMounted(() => {
  const { scroll } = useLocomotive();
  scroll.value.update();
  scroll.value.on("call", (value, way, obj) => {
    if (value === "shuffleTitleAbout" && glitchClasses.value !== "hero glitch layers") {
      shuffleTitle();
    }
  });
});
</script>
<style lang="postcss" scoped>
#about {
  margin-top: -30vh;
}
.service {
  @apply w-80 mx-auto mb-8 lg:mb-0 lg:w-1/4 transition-opacity duration-300 opacity-0 inview:opacity-100;
  transition-delay: 150ms;
}

@media (min-width: 768px) {
  .service {
    transition-delay: calc(var(--i) * 150ms);
  }
}
</style>
