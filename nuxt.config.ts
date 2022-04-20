import { defineNuxtConfig } from "nuxt";
import svgLoader from "vite-svg-loader";
const baseUrl = process.env.BASE_URL || "http://localhost:3000";
const storyBlokToken = process.env.STORYBLOK_TOKEN || "eoi2cPdx8FrnWRRqRFaeTwtt";
const noopTransform = () => {
  return {
    props: [],
    needRuntime: true,
  }
}
// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  css: ["@/assets/css/main.css"],
  components: {
    global: true,
    dirs: ['~/components'],
  },
  hooks: {
    'components:dirs' (dirs) {
      dirs.push({
        path: '~/components'
      })
    },
    "build:before": ({ nuxt }, config) => {
      // If it's using Webpack
      const isWebpack = nuxt.options.vite === false
      const isProduction = nuxt.options.dev === false
      if (isWebpack || (!isWebpack && isProduction)) {
        config.transpile = [
          ...(config.transpile || []),
          "@storyblok/vue",
          "storyblok-js-client",
        ]
      }

      const opts = config.loaders.vue.compilerOptions
      const transforms = opts.directiveTransforms || {}
      opts.directiveTransforms = { ...transforms, editable: noopTransform }
    },
  },
  modules: [
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
