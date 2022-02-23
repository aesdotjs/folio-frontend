<template>
  <nav
    id="header"
    ref="header"
    class="fixed top-0 z-40 w-full transition-all navbar"
    :class="{
      'navbar--hidden': !showNavbar,
    }"
  >
    <div
      class="container flex flex-wrap items-center w-full p-4 mx-auto text-aeswhite"
    >
      <div class="-ml-1">
        <nuxt-link
          :to="{ name: 'index' }"
          class="flex flex-row items-center py-2 cursor-pointer endpos"
          data-cursor-hover
          @click.native="state.toggleMenu = false"
        >
          <img
            v-if="global.siteIcon"
            :src="getMedia(global.siteIcon.data.attributes.url)"
            alt="Bluresca Logo"
            width="70"
            height="81"
          />
        </nuxt-link>
      </div>
      <div class="ml-auto lg:hidden">
        <NavToggle />
      </div>
      <div
        class="flex-grow w-full overflow-hidden text-lg lg:items-center lg:w-auto lg:block lg:p-0"
      >
        <NavContent class="hidden lg:flex" />
        <ClientOnly>
          <CollapseTransition>
            <NavContent v-show="state.toggleMenu" class="lg:hidden" />
          </CollapseTransition>
        </ClientOnly>
      </div>
    </div>
  </nav>
</template>

<style lang="postcss">
.navbar {
  transition: transform 100ms ease-out;
}
.navbar.navbar--hidden {
  transform: translate3d(0, -105%, 0);
}
</style>
<script setup>
import CollapseTransition from "@ivanv/vue-collapse-transition/src/CollapseTransition.vue";
import { onClickOutside } from '@vueuse/core';
const getMedia = getStrapiMedia;
const state = useGlobalState();
const props = defineProps({ global: Object});
const showNavbar = ref(true);
const lastScrollPosition = ref(0);
const realScrollPosition = ref(0);
const header = ref(null);
console.log(props.global.siteIcon.data.attributes.url)
onClickOutside(header, () => state.value.toggleMenu = false);
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onMounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
const handleScroll = function () {
  const currentScrollPosition =
    window.pageYOffset || document.documentElement.scrollTop;
  this.realScrollPosition = currentScrollPosition;
  if (currentScrollPosition < 0) {
    return;
  }
  // Stop executing this function if the difference between
  // current scroll position and last scroll position is less than some offset
  if (Math.abs(currentScrollPosition - lastScrollPosition) < 60) {
    return;
  }
  showNavbar = currentScrollPosition < lastScrollPosition;
  state.value.toggleMenu = false;
  lastScrollPosition = currentScrollPosition;
};
</script>

