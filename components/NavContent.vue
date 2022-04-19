<template>
  <ul
    class="flex flex-col items-end justify-end text-lg list-reset lg:flex-row lg:items-center"
  >
    <li
      v-for="route in routes"
      class="lg:mr-3"
      :class="{
        active: isActive(route.hash),
      }"
    >
      <StoryLink
        :route="route"
        class="inline-block py-2 mx-4 transition-all"
        data-cursor-hover
        @click.native="handleToggleMenu()"
      />
    </li>
    <li>
      <div class="items-center py-2 mx-3 flex">
        <LanguageSwitcher />
      </div>
    </li>
  </ul>
</template>
<style lang="postcss" scoped>
li a {
  position: relative;
  color: var(--color-aeswhite);
}
li:hover a {
  color: var(--color-aesorange);
}
li a::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 3px;
  bottom: 0;
  left: 0;
  background-color: var(--color-aesorange);
  transform: scaleX(0);
  transition: transform 0.3s;
  transform-origin: bottom right;
}
li.active a::after,
li:hover a::after {
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
  -webkit-transform-origin: bottom left;
  transform-origin: bottom left;
}
</style>
<script setup>
const props = defineProps({ routes: Array });
const toggleMenu = useStateToggleMenu();
const elementsInViewport = useStateElementsInViewport();
const lg = useStateLanguage();
const route = useRoute();
const routeName = computed(() => route.name);
const isActive = function (el) {
  return routeName.value === (lg.value === "fr" ? "fr" : "index") && elementsInViewport.value.indexOf(el.slice(1)) > -1;
};
const handleToggleMenu = function () {
  toggleMenu.value = !toggleMenu.value;
};
</script>
