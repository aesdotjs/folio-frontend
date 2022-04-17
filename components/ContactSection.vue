<template>
  <section
    id="contact"
    class="w-full relative pt-8 pb-32 text-white"
    :class="blok.class"
    data-scroll-section
    v-editable="blok"
  >
    <div class="flex flex-col items-center">
      <h1
        v-if="blok.title"
        class="text-2xl lg:text-4xl font-retro"
        :data-text="blok.title"
      >
        {{ blok.title }}
      </h1>
      <DynamicForm :blok="blok.form[0]" class="mt-16"></DynamicForm>
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
