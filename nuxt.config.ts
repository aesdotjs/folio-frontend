import { defineNuxtConfig } from 'nuxt3';
import svgLoader from "vite-svg-loader";
const baseUrl = process.env.BASE_URL || "http://localhost:3000";
const storyBlokToken = process.env.STORYBLOK_TOKEN || "eoi2cPdx8FrnWRRqRFaeTwtt";
// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  css: ["@/assets/css/main.css"],
  components: {
    global: true,
    //dirs: ['~/components'],
  },
  hooks: {
    'components:dirs' (dirs) {
      dirs.push({
        path: 'components'
      })
    }
  },
  modules: [
    ["@storyblok/nuxt", { 
      accessToken: storyBlokToken ,
      cache: {
      clear: "auto",
      type: "memory",
      },
    }],
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    ["@nuxtjs/pwa",
    {
      meta: {
        title: "Sitename",
        author: "Aes",
      },
      manifest: {
        name: "Sitename",
        short_name: "Sitename",
        lang: "en",
        theme_color: "#721626",
      },
    }],
    ["@nuxtjs/sitemap",
    {
      hostname: baseUrl,
      gzip: true,
      defaults: {
        changefreq: "daily",
        priority: 1,
        lastmod: new Date(),
      },
    }],
    ["@nuxtjs/robots", 
    {
      Sitemap: `${baseUrl}/sitemap.xml`,
    }], //not working yet
    ["nuxt-canonical", { baseUrl}],
    ["@aceforth/nuxt-netlify", {
      mergeSecurityHeaders: true
    }],
  ],
  publicRuntimeConfig: {
    baseUrl,
    storyBlokToken,
  },
  vite: {
    plugins: [svgLoader()],
  },
  vueuse: {
    ssrHandlers: true,
  },
  build: {
    transpile: ['#app'],
  },
});
