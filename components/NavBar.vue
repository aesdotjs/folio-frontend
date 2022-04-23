<template>
  <nav
    id="header"
    ref="header"
    class="fixed top-0 z-40 w-full transition-all navbar"
    :class="{
      'navbar--hidden': !showNavbar,
      'bg-aesblue' : realScrollPosition > 120 || toggleMenu
    }"
  >
    <div
      class="container flex flex-wrap items-center w-full px-6 py-4 lg:py-6 mx-auto text-aeswhite font-retro"
    >
      <div class="-ml-1">
        <nuxt-link
          :to="{ name: 'index' }"
          class="flex flex-row items-center py-2 cursor-pointer endpos"
          data-cursor-hover
          @click.native="toggleMenu = false"
        >
          <img
            v-if="site.siteIcon"
            :src="site.siteIcon.filename"
            alt="Bluresca Logo"
            width="70"
            height="81"
          />
        </nuxt-link>
      </div>
      <ClientOnly>
        <NavBugs class="flex flex-wrap flex-1 mx-6"/>
      </ClientOnly>
      <div class="ml-auto lg:hidden">
        <NavToggle />
      </div>
      <div
        class="flex-grow w-full overflow-hidden text-lg lg:items-center lg:w-auto lg:block lg:p-0"
      >
        <NavContent class="hidden lg:flex" :routes="routes"/>
        <ClientOnly>
          <CollapseTransition>
            <NavContent v-show="toggleMenu" class="lg:hidden" :routes="routes"/>
          </CollapseTransition>
        </ClientOnly>
      </div>
    </div>
  </nav>
</template>

<style lang="postcss">
.navbar.navbar--hidden {
  transform: translate3d(0, -105%, 0);
}
</style>
<script setup>
import CollapseTransition from "@ivanv/vue-collapse-transition/src/CollapseTransition.vue";
import { onClickOutside } from '@vueuse/core';
const props = defineProps({ site: Object, routes: Array });
const showNavbar = useStateShowNavbar();
const lastScrollPosition = ref(0);
const realScrollPosition = ref(0);
const scrollY = useStateScrollY();
const toggleMenu = useStateToggleMenu();
const header = ref(null);
onClickOutside(header, () => toggleMenu.value = false);
const handleScroll = (currentScrollPosition) => {
  realScrollPosition.value = currentScrollPosition;
  if (currentScrollPosition < 0) {
    return;
  }
  // Stop executing this function if the difference between
  // current scroll position and last scroll position is less than some offset
  if (Math.abs(currentScrollPosition - lastScrollPosition.value) < 60) {
    return;
  }
  showNavbar.value = currentScrollPosition < lastScrollPosition.value;
  toggleMenu.value = false;
  lastScrollPosition.value = currentScrollPosition;
};
watch(scrollY, handleScroll);
</script>

