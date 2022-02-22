<template>
  <div ref="holder">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import ShaderProgram from "@/utils/ShaderProgram";
const holder = ref(null);
const canvas = ref(null);
const star = ref(null);
onMounted(() => {
  star.value = new ShaderProgram(holder.value, canvas.value, {
    mousemove: false,
    mouseclick: false,
    depthTest: true,
    antialias: true,
    uniforms: {
      worldSize: { type: "vec3", value: [0, 0, 0] },
    },
    fragment: `
  precision highp float;
  #define PI 3.1415926
  uniform float u_time;
  uniform vec3 u_mousemove;
  uniform vec2 u_resolution;
  uniform mat4 u_projection;
  uniform vec3 u_worldSize;
  vec3 getColor(float c){
    float r = cos((c-0.75)*PI);
    float g = cos((c-0.55)*PI);
    float b = cos((c-0.25)*PI);
    return vec3(r,g,b);
  }

  mat2 rot2D(float a){
    float c = cos(a);
    float s = cos(a);
    return mat2(c,s,-s,c); 
  }

  float hash1(vec2 p){
    vec2 v = vec2(PI*1453.0,exp(1.)*3054.0);
    return fract(sin(dot(p,v)*0.1)*4323.0);
  }

  vec2 hash2(vec2 p){
    vec2 v = vec2(hash1(p),hash1(p*p));   
    return v+v*rot2D(u_time*0.5); 
  }

  void star(inout vec3 col,vec2 uv,vec2 cuv){
    float v =0.0;
    
      
    v+=abs(0.5)/length(uv-70.*vec2(hash2(uv*5.0)));
      
    col+= getColor(0.14)*v*1.4; 
  }

  
  void main()
  {
      // Normalized pixel coordinates (from 0 to 1)
      vec2 uv = gl_FragCoord/u_resolution.xy;
      vec2 cuv = uv - vec2(0.5);
      cuv.x *= u_resolution.x/u_resolution.y;
      // Time varying pixel color
      vec3 col = vec3(0);
      cuv *=10.;
      star(col,uv,cuv);
      // Output to screen
      gl_FragColor = vec4(col.x,col.y,col.z,1.0);
  }`,
    onResize(w, h, dpi) {
      const position = [],
        color = [],
        size = [],
        rotation = [],
        speed = [];
      // z in range from -80 to 80, camera distance is 100
      // max height at z of -80 is 110
      const height = 110;
      const width = (w / h) * height;
    },
    onUpdate(delta) {

    },
  });
});
</script>
