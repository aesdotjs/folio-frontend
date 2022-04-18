import * as PIXI from "pixi.js";
import { PixelateFilter } from '@pixi/filter-pixelate';
import { CRTFilter } from '@pixi/filter-crt';
export default defineNuxtPlugin(() => {
  return {
    provide: {
      PIXI,
      PixelateFilter,
      CRTFilter,
    }
  }
})