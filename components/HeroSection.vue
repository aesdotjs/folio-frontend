<template>
  <section
    id="hero"
    class="min-h-screen overflow-hidden relative parallax-container"
    :class="blok.cssClasses"
    data-scroll-section
  >
    <HeroPixi :ratio="parseFloat(blok.pixelationRatio)" :perspective="parseFloat(blok.perspective)"/>
    <div class="absolute top-0 w-full z-10">
      <div class="hero-content">
        <h1>
          <span ref="shuffle1">{{ blok.title }}</span>
          <span ref="shuffle2" class="text-aesorange whitespace-nowrap hidden">{{ blok.title2 }}</span>
        </h1>
        <h2 ref="shuffle3" class="text-base sm:text-xl lg:text-3xl hidden">
          {{ blok.subTitle }}
        </h2>
        <div class="mt-4 flex flex-row text-sm sm:text-xl lg:text-2xl">
          <StoryLink
            v-for="(route, i) in blok.routes"
            :route="route"
            class="btn-hero"
            :class="{ 'opacity-0': !showBtns }"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import shuffleLetters from "shuffle-letters/dist/shuffle-letters.esm";

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

const shuffle1 = ref(null);
const shuffle2 = ref(null);
const shuffle3 = ref(null);
const showBtns = ref(false);
onMounted(() => {
  shuffleLetters(shuffle1.value, {
    onComplete: () => {
      shuffle2.value.classList.remove("hidden");
      shuffleLetters(shuffle2.value, {
        onComplete: () => {
          shuffle3.value.classList.remove("hidden");
          shuffleLetters(shuffle3.value, {
            onComplete: () => {
              showBtns.value = true;
            },
          });
        },
      });
    },
  });
});
</script>

<style lang="postcss" scoped>
.hero-content {
  @apply container mx-auto flex flex-col mt-40 px-4 text-2xl lg:text-4xl font-retro text-white;
  text-shadow: 0 0 3px black;
}
.btn-hero {
  @apply px-4 py-2 transition-all hover:text-aesorange border-2 hover:border-aesorange ml-4;
}
.btn-hero:first-child {
  margin-left: 0;
}
.position-bottom {
  object-position: bottom;
}
.bug-green {
  bottom: 65px;
  left: calc(50% - 14px);
}

</style>
