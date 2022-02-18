import { createGlobalState, useStorage } from "@vueuse/core";
export const useGlobalState = createGlobalState(
  () => useStorage('vueuse-local-storage', {
    toggleMenu: false,
    hasLoaded: false,
    sectionInViewport: "",
  }),
)