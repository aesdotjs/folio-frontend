<template>
  <footer>
    <div class="bg-red-dotted text-bwhite border-t border-bwhite">
      <div
        class="container flex flex-col items-center w-full p-4 mx-auto lg:flex-row"
      >
        <nuxt-link
          :to="{ name: 'index' }"
          class="flex items-center py-2 cursor-pointer"
          data-cursor-hover
        >
          <img
            v-if="global.siteIcon"
            :src="getMedia(global.siteIcon.data.attributes.url)"
            alt="Bluresca's Logo"
            width="50"
            height="58"
          />
        </nuxt-link>
        <div class="flex items-center w-auto mx-auto lg:ml-auto lg:mr-0">
          <div class="text-xl font-medium mr-2">Socials</div>
          <ul
            class="flex flex-wrap items-end justify-end py-6 font-light list-reset sm:items-center lg:py-0"
          >
            <li
              v-for="link in global.socials"
              :key="link.data.attributes.url"
              class="w-1/2 sm:w-auto p-1"
            >
              <a
                v-if="link.data.attributes.icon"
                :href="link.data.attributes.url"
                target="_blank"
                class="w-full flex flex-wrap items-center justify-center px-4 py-1 sm:ml-3 text-sm transition-colors border rounded-full sm:w-auto border-bwhite hover:text-bred hover:bg-bwhite"
                data-cursor-hover
              >
                <div
                  v-if="link.data.attributes.icon"
                  class="w-3 h-3 mr-2"
                  v-html="link.data.attributes.icon.svgIcon"
                ></div>
                <span>{{ link.data.attributes.icon.name }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup>
const props = defineProps({global: Object});
const getMedia = getStrapiMedia;
</script>
