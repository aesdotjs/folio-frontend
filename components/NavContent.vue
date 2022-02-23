<template>
  <ul
    class="flex flex-col items-end justify-end p-4 text-lg font-thin list-reset lg:flex-row lg:items-center"
  >
    <li
      class="lg:mr-3"
      :class="{
        active: isActive('hero'),
      }"
    >
      <nuxt-link
        :to="{ name: 'index', hash: '#hero' }"
        class="inline-block py-2 mx-4 transition-colors"
        data-cursor-hover
        @click.native="handleToggleMenu()"
      >
        Home
      </nuxt-link>
    </li>
    <li
      class="lg:mr-3"
      :class="{
        active: isActive('about'),
      }"
    >
      <nuxt-link
        :to="{ name: 'index', hash: '#about' }"
        class="inline-block py-2 mx-4 transition-all"
        data-cursor-hover
        @click.native="handleToggleMenu()"
      >
        About
      </nuxt-link>
    </li>
    <li
      class="lg:mr-3"
      :class="{
        active: isActive('services'),
      }"
    >
      <nuxt-link
        :to="{ name: 'index', hash: '#services' }"
        class="inline-block py-2 mx-4 transition-all"
        data-cursor-hover
        @click.native="handleToggleMenu()"
      >
        Services
      </nuxt-link>
    </li>
    <li
      class="lg:mr-3"
      :class="{
        active: isActive('models'),
      }"
    >
      <nuxt-link
        :to="{ name: 'index', hash: '#models' }"
        class="inline-block py-2 mx-4 transition-all"
        data-cursor-hover
        @click.native="handleToggleMenu()"
      >
        Models
      </nuxt-link>
    </li>
    <li
      class="lg:mr-3"
      :class="{
        active: isActive('contact'),
      }"
    >
      <nuxt-link
        :to="{ name: 'index', hash: '#contact' }"
        class="inline-block py-2 mx-4 transition-all"
        data-cursor-hover
        @click.native="handleToggleMenu()"
      >
        Contact
      </nuxt-link>
    </li>
  </ul>
</template>
<style lang="postcss" scoped>
li a {
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: transparent;
  position: relative;
  color: var(--color-aeswhite);
}
li:hover a {
  -webkit-text-stroke-color: var(--color-aesorange);
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
const state = useGlobalState();
const route = useRoute();
const routeName = computed(() => route.value.name);
const isActive = function (page) {
  return routeName === "index" && state.sectionInViewport === page;
};
const handleToggleMenu = function () {
  state.toggleMenu = !state.toggleMenu;
};
</script>
