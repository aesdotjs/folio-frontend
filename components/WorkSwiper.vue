<template>
  <swiper
    :modules="[Navigation, Lazy]"
    :lazy="{ loadPrevNext: true }"
    
    :navigation="true"
    class="container mt-16 !overflow-visible"
  >
    <swiper-slide v-for="work in works" :key="work.content._uid">
      <work :blok="work.content" />
    </swiper-slide>
  </swiper>
</template>
<script setup>
import { Navigation, Lazy } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
const lg = useStateLanguage();
const { works } = await useGetWorks(lg.value);
onMounted(() => {
  works.forEach((work, i) => {
    useStoryBridge2(
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
