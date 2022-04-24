import { createGlobalState, useLocalStorage } from '@vueuse/core';
export const useStateToggleMenu = () => useState('toggleMenu', () => false);
export const useStateShowNavbar = () => useState('showNavbar', () => true);
export const useStateLoading = () => useState('loading', () => true);
export const useStateScrollY = () => useState('scrollY', () => 0);
export const useStateElementsInViewport = () => useState('elementsInViewport', () => []);
export const useStateLanguage = () => useState('language', () => "");
export const useStateBugTypes = () => useState('bugTypes', () => []);
export const useStateBugsFound = createGlobalState(
  () => useLocalStorage('bugsFound', []),
);
