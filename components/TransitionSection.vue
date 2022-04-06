<template>
  <section 
    class="w-full bg-aeswhite"
    :class="blok.cssClasses"
    data-scroll-section>
    <canvas ref="canvas" class="w-full h-screen" data-scroll :data-scroll-id="`${blok._uid}`"></canvas>
  </section>
</template>
<style scoped>
</style>
<script setup>
import * as twgl from "twgl.js/dist/4.x/twgl-full.js";
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
const progress = ref(0);
const hexToRgb = function(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
}
const canvas = ref(null);
const vertex = `
attribute vec4 position;

void main() {
  gl_Position = position;
}`;
const fragment = `
  precision highp float;
  uniform float time;
  uniform vec2 resolution;
  uniform vec3 startColor;
  uniform vec3 endColor;
  uniform float progress;
  uniform bool rotateProgress;
  uniform float insetSquare;
  uniform float rotate;
  uniform float squareQty;
  void main()
  {
    float aspect = resolution.y/resolution.x;
    float aspect2 = resolution.x/resolution.y;
    float value;
    vec2 uv = gl_FragCoord.xy / resolution.x;
    vec2 uv2 = uv - vec2(0.5, 0.5*aspect);
    float rot;
    if(rotateProgress)
      rot = radians(rotate * progress);
    else
      rot = radians(rotate);
    mat2 m = mat2(cos(rot), -sin(rot), sin(rot), cos(rot));
   	uv2  = m * uv2;
    uv2 += vec2(0.0, 0.5*aspect);
    uv2.y+=1.0*(1.0-aspect);
    float finalQty = floor(squareQty*aspect2);
    vec2 pos = finalQty*uv2;
    vec2 rep = fract(pos);
    float dist = 2.0*min(min(rep.x, 1.0-rep.x), min(rep.y, 1.0-rep.y));
    float edge = min((progress*(1.0/(uv.y*aspect2))), 1.0);
    value = fract (dist * insetSquare);
    value = mix(value, 1.0-value, step(1.0, edge));
    edge = abs(1.0-edge);
    value = smoothstep( edge-0.05, edge, 0.85*value);
    gl_FragColor = mix(vec4(startColor / 255.0,1.0),vec4(endColor / 255.0,1.0), value);
  }`;
let gl, programInfo, bufferInfo, arrays;
const initiate = function(){
  gl = canvas.value.getContext("webgl");
  programInfo = twgl.createProgramInfo(gl, [vertex, fragment]);
  arrays = {
    position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
  };
  bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
  requestAnimationFrame(render);
}
const render = function() {
  twgl.resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  const uniforms = {
    resolution: [gl.canvas.width, gl.canvas.height],
    startColor: hexToRgb(props.blok.startColor.color) || [255,255,255],
    endColor: hexToRgb(props.blok.endColor.color) || [0,0,0],
    progress: progress.value,
    insetSquare: parseFloat(props.blok.insetSquare) || 1.0,
    squareQty: parseFloat(props.blok.squareQty) || 10.0,
    rotate: parseFloat(props.blok.rotate) || 10.0,
    rotateProgress: props.blok.rotateProgress|| false,
  };
  gl.useProgram(programInfo.program);
  twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
  twgl.setUniforms(programInfo, uniforms);
  twgl.drawBufferInfo(gl, bufferInfo);
}
watch(progress, () => {
  requestAnimationFrame(render);
});
onMounted(() => {
  const { scroll } = useLocomotive();
  scroll.value.update();
  scroll.value.on("scroll", (args) => {
    // Get all current elements : args.currentElements
    if(typeof args.currentElements[props.blok._uid] === 'object') {
        progress.value = args.currentElements[props.blok._uid].progress;
    }
  });
  initiate();
});
onUnmounted(() => {

})
</script>
