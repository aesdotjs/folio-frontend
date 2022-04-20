<template>
  <Swiper
    :modules="modules"
    :lazy="{ loadPrevNext: true }"
    :pagination="{
      clickable: true,
    }"
    :navigation="true"
    class="container mt-16 !overflow-visible"
  >
    <SwiperSlide v-for="work in works" :key="work.content._uid">
      <Work :blok="work.content" />
    </SwiperSlide>
  </Swiper>
</template>
<script setup>
import { Pagination, Navigation, Lazy } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
const modules = [Pagination, Navigation, Lazy];
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
