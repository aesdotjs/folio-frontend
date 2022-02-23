import { defineNuxtConfig } from 'nuxt3';
import svgLoader from "vite-svg-loader";
const strapiBaseUri = process.env.API_URL || "http://localhost:1337";
const baseUrl = process.env.BASE_URL || "http://localhost:3000";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  css: ["@/assets/css/main.css"],
  components: true,
  modules: [ 
    ['@nuxtjs/strapi',
    {
      url: strapiBaseUri,
      entities: [
        {
          name: "models",
          type: "collection",
        },
        {
          name: "homepage",
          type: "single",
        },
        {
          name: "global",
          type: "single",
        },
        {
          name: "modelspage",
          type: "single",
        },
      ],
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
    "@aceforth/nuxt-netlify",
  ],
  publicRuntimeConfig: {
    strapiBaseUri,
    baseUrl,
  },
  vite: {
    plugins: [svgLoader()],
  },
  vueuse: {
    ssrHandlers: true,
  },
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  }
});
