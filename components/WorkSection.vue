<template>
  <section
    id="work"
    class="min-h-screen w-full relative pt-8 pb-32 bg-aespurple1"
    :class="blok.cssClasses"
    data-scroll-section
  >
    <div class="container mx-auto px-6">
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
  shuffleLetters(shuffle.value, {
    onComplete: () => {
      glitchClasses.value = "hero glitch layers";
    },
  });
};
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