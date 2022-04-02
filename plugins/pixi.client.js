import * as PIXI from "pixi.js";
import { PixelateFilter } from '@pixi/filter-pixelate';
export default defineNuxtPlugin(() => {
  return {
    provide: {
      PIXI,
      PixelateFilter
    }
  }
})