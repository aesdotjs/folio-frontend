<template>
  <div class="p-2 relative" v-editable="blok">
    <div :class="additionalClasses">
      <img
        v-if="blok.icon"
        :src="blok.icon.filename"
        :alt="blok.icon.alt"
        width="64"
        heigh="64"
        class="w-16 h-16 object-contain text-center"
      />
      <h2 class="text-xl mt-4 !font-semibold uppercase tracking-wide">{{ blok.name}}</h2>
      <div v-html="richText" class="mt-4 px-2 !font-normal"></div>
    </div>
    <ClientOnly>
      <div v-if="!hasAboutServiceBugBeenFound && curId === 2" class="absolute -right-5 -bottom-5 transform -rotate-45 shake">
        <Bug slug="about-service" :beacon="true"/>
      </div>
    </ClientOnly>
  </div>
</template>
<style lang="postcss" scoped>
.service-card {
  @apply flex flex-col h-full items-center text-aesblue bg-aeswhite p-4 relative;
}

.bugged {
  animation: font 5s infinite;
}

.shake {
  animation: shake 0.3s linear infinite;
}

@keyframes shake {
  from {
    transform: rotate(-48deg);
  }
  to {
    transform: rotate(-42deg);
  }
}

</style>

<script setup>
const bugsFound = useStateBugsFound();
const hasAboutServiceBugBeenFound = computed(() => process.client ? (bugsFound.value.findIndex((i) => i.gName === "about-service") > -1) : true);
const additionalClasses = computed(() => {
  return (!hasAboutServiceBugBeenFound.value && props.curId === 2) ? "service-card drop-purple2 bugged" : "service-card drop-purple2";
});
const storyapi = useStoryApi();
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
  curId : Number,
});
const richText = computed(() => {
  return storyapi.richTextResolver.render(props.blok.content)
});
</script>
