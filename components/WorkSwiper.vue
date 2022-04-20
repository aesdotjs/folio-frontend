<template>
  <swiper
    :modules="[Lazy]"
    :lazy="{ loadPrevNext: true }"
    :pagination="{
      clickable: true,
    }"
    :navigation="true"
    class="container mt-16 !overflow-visible"
  >
    <swiper-slide v-for="work in works" :key="work.content._uid">
      <work :blok="work.content" />
    </swiper-slide>
  </swiper>
</template>
<script setup>
import { Lazy } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
const lg = useStateLanguage();
const { works } = await useGetWorks(lg.value);
onMounted(() => {
  works.forEach((work, i) => {
    useStoryBridge(
      work.id,
      (event) => {
        works[i] = event;
      },
      {
        resolveRelations: ["TechGroup.technos","Work.technos"],
      }
    );
  });
});
</script>
