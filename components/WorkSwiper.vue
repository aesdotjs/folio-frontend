<template>
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
      v-for="work in works"
      :key="work.content._uid"
    >
      <work :blok="work.content" />
    </swiper-slide>
  </swiper>
</template>
<script setup>
import { Pagination, Navigation, Lazy } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
const lg = useStateLanguage();
const { works } = await useGetWorks(lg.value);
onMounted(() => {
  works.forEach((work, i) => {
    useStoryBridge2(work.id, event => {
      works[i] = event;
    }, {
      resolveRelations: ["work.technos"],
      language: lg.value,
    });
  });
});
</script>