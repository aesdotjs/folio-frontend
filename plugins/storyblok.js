import StoryblokVue from "@storyblok/vue";
import StoryblokClient from 'storyblok-js-client/source';
const loadScript = (src, cb) => {
  if (document.getElementById("storyblok-javascript-bridge")) {
    return cb();
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  script.id = "storyblok-javascript-bridge";

  script.onerror = function () {
    cb(new Error("Failed to load" + src));
  };

  script.onload = function () {
    cb();
  };

  document.getElementsByTagName("head")[0].appendChild(script);
};

let doLoadScript = true;

const initStoryapi = (options) => {
  return new StoryblokClient({
    accessToken: options.accessToken,
    cache: {
      clear: 'auto',
      type: options.cacheProvider || 'memory',
    },
    timeout: options.timeout || 0,
  });
}

const storybridge = (cb, errorCb) => {
  if (typeof errorCb !== "function") {
    errorCb = function () {};
  }
  if (window.location == window.parent.location) {
    return;
  }
  if (!doLoadScript) {
    if (!window.StoryblokBridge) {
      errorCb("The Storyblok bridge script is already loading.");
      return;
    }
    cb();
    return;
  }
  doLoadScript = false;
  loadScript("https://app.storyblok.com/f/storyblok-v2-latest.js", cb);
};


export default defineNuxtPlugin(() => {
  const nuxtApp = useNuxtApp();
  const config = useRuntimeConfig();
  const options = { 
    accessToken: config.storyBlokToken ,
  }
  const storyapi = initStoryapi(options);
  nuxtApp.vueApp.use(StoryblokVue);
  return {
    provide: {
      storyapi,
      storybridge
    }
  }
})