<template>
  <div class="flex flex-col sm:flex-row" v-editable="blok">
    <div class="w-full sm:w-1/2 px-6" data-scroll>
      <Swiper
        :modules="modules"
        :effect="'cards'"
        class="transition opacity-0 sw-active:opacity-100 duration-300 delay-300"
      >
        <SwiperSlide
          v-for="(photo, id) in photos"
          :key="id"
          class="pb-[140%] sm:pb-[120%] lg:pb-[100%] relative"
        >
          <img
            :data-srcset="getImageSrcSet(photo.filename)"
            :data-src="transformImage(photo.filename, '0x640')"
            :sizes="getImageSizes(photo)"
            :alt="photo.alt"
            class="swiper-lazy absolute h-full w-full object-cover"
          />
          <div
            class="absolute w-full h-1/2 bottom-0 bg-gradient-to-b from-transparent via-transparent to-aeswhite/80 pointer-events-none"
          ></div>
          {{ blok.name }}
          <ClientOnly>
            <div v-if="!hasWorkSlideBugBeenFound && id === 1 && blok.name === 'Plombier Parfait'" class="absolute right-3 transform -scale-x-100">
              <Bug slug="work-slide" :beacon="true"/>
            </div>
          </ClientOnly>
        </SwiperSlide>
      </Swiper>
    </div>
    <div
      class="w-full px-6 sm:pl-8 -mt-6 sm:mt-0 relative z-10 text-aesblue sm:w-1/2 lg:w-1/2 sm:ml-auto lg:pl-16 xl:pl-6 xl:w-1/3"
      data-scroll
    >
      <div
        class="flex justify-center transition opacity-0 sw-active:opacity-100 delay-200 duration-300"
      >
        <a
          v-if="blok.url.url"
          :href="blok.url.url"
          target="_blank"
          class="text-2xl font-retro text-center"
        >
          {{ blok.name }} 
          <div class="inline-block w-4 h-4 ml-2">
            <ExternalLink class="inline w-full h-full" viewBox="0 0 8 8" />
          </div>
        </a>
        <h2 v-else class="text-2xl font-retro text-center">{{ blok.name }}</h2>
      </div>
      <div
        v-html="richText"
        class="mt-8 px-0 transition opacity-0 sw-active:opacity-100 delay-300 duration-300"
      ></div>
      <div class="flex flex-wrap py-2 justify-center sm:justify-end mt-4">
        <component
          v-for="techno in blok.technos"
          :key="techno.content._uid"
          :blok="techno.content"
          :is="techno.content.component"
          class="techno"
        />
      </div>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.techno {
  @apply py-2 px-4 m-px bg-aeswhite flex-1 text-center font-retro transition-all duration-150 transform scale-125 opacity-0 sw-active:scale-100 sw-active:opacity-100;
  text-shadow: 0 0 2px black;
}
.swiper-slide {
  filter: drop-shadow(5px -15px 15px rgba(11, 2, 51, 0.2));
  overflow: visible;
}

.object-cover {
  object-position: top;
}
</style>
<script setup>
import { EffectCards } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-cards";
import ExternalLink from '~/assets/img/external-link.svg';
const modules = [EffectCards];
const storyapi = useStoryApi();
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
const bugsFound = useStateBugsFound();
const hasWorkSlideBugBeenFound = computed(() => bugsFound.value.findIndex((i) => i.gName === "work-slide") > -1);
const photos = computed(() =>
  props.blok.photos instanceof Array ? props.blok.photos : [props.blok.photos]
);
const richText = computed(() => {
  return storyapi.richTextResolver.render(props.blok.content);
});
const getImageSrcSet = function (photo) {
  const srcSet = [
    { maxWidth: "1024", src: transformImage(photo, "1024x0") },
    { maxWidth: "640", src: transformImage(photo, "640x0") },
  ];
  return srcSet
    .map((elem) => {
      return elem.src + " " + elem.maxWidth + "w";
    })
    .join(",");
};
const getImageSizes = function () {
  return `(max-width: 640px) 640w, (max-width: 1024px) 1024w, (max-width: 1920px) 1024w`;
};
const transformImage = function (image, option) {
  if (!image) return "";
  if (!option) return "";
  return image + "/m/" + option;
};
</script>
