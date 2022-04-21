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
      // FIX for SSR on v-editable
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
    ["nuxt-canonical", { baseUrl}],
    ["@aceforth/nuxt-netlify", {
      mergeSecurityHeaders: true
    }],
  ],
  runtimeConfig: {
    public: {
      baseUrl,
      storyBlokToken,
    },
  },
  vite: {
    plugins: [svgLoader()],
  },
  vueuse: {
    ssrHandlers: true,
  },
  build: {
    transpile: [],
  },
});
