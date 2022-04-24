<template>
  <section
    id="work"
    class="w-full relative pt-8 pb-32"
    :class="blok.class"
    data-scroll-section
    data-scroll
    data-scroll-id="work"
    v-editable="blok"
  >
    <div>
      <div class="flex justify-center work-title">
        <h1
          v-if="blok.title"
          class="text-2xl lg:text-4xl font-retro relative"
          :data-text="blok.title"
          :class="glitchClasses"
          data-scroll
          data-scroll-offset="20%"
          data-scroll-call="shuffleTitleWork"
        >
          <span ref="shuffle">{{ blok.title }}</span>
          <ClientOnly>
            <div v-if="!hasWorkTitleBugBeenFound" class="worktitle-bug">
              <Bug ref="titlebug" slug="work-title" @found="triggerTitlebug"/>
            </div>
          </ClientOnly>
        </h1>
      </div>
      <WorkSwiper></WorkSwiper>
    </div>
  </section>
</template>
<style lang="postcss" scoped>
#work {
  margin-top: -30vh;
}
.worktitle-bug {
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(100%);
  animation: crunch 500ms infinite linear;
}
@keyframes crunch {
  0% {
    transform: translateX(110%);
  }
  100%{
    transform: translateX(100%);
  }
}
</style>
<script setup>
import shuffleLetters from "shuffle-letters/dist/shuffle-letters.esm";
const bugsFound = useStateBugsFound();
const hasWorkTitleBugBeenFound = computed(() => bugsFound.value.findIndex((i) => i.gName === "work-title") > -1);
const shuffle = ref(null);
const titlebug = ref(null);
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
      glitchClasses.value = !hasWorkTitleBugBeenFound.value ? "hero glitch layers cursor-pointer" : "";
    },
  });
};
const triggerTitlebug = function () {
  glitchClasses.value = [];
}
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

