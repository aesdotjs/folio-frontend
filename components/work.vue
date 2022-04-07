<template>
  <div
  :style="{ backgroundColor: blok.color.color, color: shadedColor}">
    <swiper
      :modules="[Pagination, Navigation, Lazy]"
      :effect="'cards'"
      :lazy="true"
      :pagination="{
        clickable: true,
      }"
      :navigation="true"
    >
    <swiper-slide v-for="(photo, id) in blok.photos" :key="id" class="w-1/2">
      <img :data-src="photo?.filename" :alt="photo?.alt" class="swiper-lazy"/>
    </swiper-slide>
  </swiper>
  </div>
</template>
<script setup>
import { Lazy, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import 'swiper/css';
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
const shadedColor = computed(() => shadeColor(props.blok.color.color, 245));
</script>