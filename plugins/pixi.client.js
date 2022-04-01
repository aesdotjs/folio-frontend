import * as PIXI from "pixi.js";
export default defineNuxtPlugin(() => {
  return {
    provide: {
      PIXI
    }
  }
})