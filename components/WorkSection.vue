<template>
  <section
    id="work"
    class="min-h-screen w-full relative pt-8 pb-32 bg-aeswhite text-aesblue"
    :class="blok.cssClasses"
    data-scroll-section
  >
    <div>
      <div class="flex justify-center">
        <h1
          v-if="blok.title"
          class="text-2xl lg:text-4xl font-retro"
          :data-text="blok.title"
          :class="glitchClasses"
          data-scroll
          data-scroll-offset="20%"
          data-scroll-call="shuffleTitleWork"
        >
          <span ref="shuffle">{{ blok.title }}</span>
        </h1>
      </div>
      <swiper
        :modules="[Pagination, Navigation, Lazy]"
        :lazy="{ loadPrevNext: true }"
        :pagination="{
          clickable: true,
        }"
        :navigation="true"
        class="container mx-auto mt-16 px-6"
      >
        <swiper-slide
          v-for="work in blok.works"
          :key="work.content._uid"
        >
          <work :blok="work.content" />
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>
<script setup>
import shuffleLetters from "shuffle-letters/dist/shuffle-letters.esm";
import { Pagination, Navigation, Lazy } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
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
  shuffleLetters(shuffle.value, {
    onComplete: () => {
      glitchClasses.value = "hero glitch layers";
    },
  });
};
console.log(props.blok);
onMounted(() => {
  const { scroll } = useLocomotive();
  scroll.value.update();
  scroll.value.on("call", (value, way, obj) => {
    if (value === "shuffleTitleWork" && glitchClasses.value !== "hero glitch layers") {
      shuffleTitle();
    }
  });
});
</script>
<style lang="postcss" scoped>
#work {
  margin-top: -30vh;
}
</style>
