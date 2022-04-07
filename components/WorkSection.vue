<template>
  <section
    id="work"
    class="min-h-screen w-full relative pt-8 pb-32 bg-aespurple1"
    :class="blok.cssClasses"
    data-scroll-section
  >
    <div>
      <div class="flex justify-center">
        <h1
          v-if="blok.title"
          class="text-2xl lg:text-4xl text-aeswhite font-retro"
          :data-text="blok.title"
          :class="glitchClasses"
          data-scroll
          data-scroll-offset="20%"
          data-scroll-call="shuffleTitle"
        >
          <span ref="shuffle">{{ blok.title }}</span>
        </h1>
      </div>
      <div class="h-screen">
        <swiper
          :modules="[Pagination, Navigation]"
          :space-between="50"
          :lazy="true"
          :pagination="{
            clickable: true,
          }"
          :navigation="true"
        >
          <swiper-slide v-for="work in blok.works" :key="work.content._uid">
            <work :blok="work.content" />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>
<script setup>
import shuffleLetters from "shuffle-letters/dist/shuffle-letters.esm";
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import 'swiper/css';
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
    if (value === "shuffleTitle" && glitchClasses.value !== "hero glitch layers") {
      shuffleTitle();
    }
  });
});
</script>
<style lang="postcss" scoped>
#work {
  margin-top: -2px;
}
</style>
