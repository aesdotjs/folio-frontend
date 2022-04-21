<template>
  <section
    id="contact"
    class="w-full min-h-screen relative py-32 text-white"
    :class="blok.class"
    data-scroll-section
    data-scroll
    data-scroll-id="contact"
    v-editable="blok"
  >
    <CRTPixi class="absolute inset-0" />
    <div class="flex justify-center">
      <h1
        v-if="blok.title"
        class="text-2xl lg:text-4xl font-retro transition-all opacity-0 inview:opacity-100 duration-300 delay-300"
        :data-text="blok.title"
        data-scroll
      >
        {{ blok.title }}
      </h1>
    </div>
    <div class="mt-16 px-6 flex flex-col sm:flex-row justify-center items-center sm:items-start">
      <div 
        class="p-6 border-4 border-white border-double opacity-0 transition-all duration-500 inview:opacity-90"
        data-scroll>
        <DynamicForm :blok="blok.form[0]"></DynamicForm>
      </div>
      <div 
        class="px-6 py-4 w-64 border-4 border-white border-double opacity-0 sm:ml-16 mt-16 sm:mt-0 transition-all duration-500 inview:opacity-90"
        data-scroll
        data-scroll-delay="300">
        <ul
          class="flex flex-col list-reset"
        >
          <li
            v-for="(link, i) in blok.socials"
            :key="link._uid"
            class="py-2 transition-all transform translate-y-5 opacity-0 inview-child:opacity-100 inview-child:translate-y-0"
            :style="{ transitionDelay : (i + 1) * 150 + 'ms'}"
          >
            <a
              :href="link.url"
              target="_blank"
              class="w-full flex items-center font-retro"
            >
              <img
                v-if="link.icon"
                :src="link.icon.filename"
                :alt="link.icon.alt"
                width="32"
                height="32"
                class="w-6 h-6 mr-4"
              />
              <span>{{ link.name ? link.name : link.url}}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script setup>
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
console.log(props.blok);
onMounted(() => {
  const { scroll } = useLocomotive();
  scroll.value.update();
});
</script>
<style lang="postcss" scoped>
#contact {
  margin-top: -30vh;
}
</style>
