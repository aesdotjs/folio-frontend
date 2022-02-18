<template>
  <div ref="holder">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style lang="postcss" scoped>
canvas {
  mask-image: radial-gradient(
    ellipse at 50% 22%,
    black 0%,
    black 62%,
    transparent 75%
  );
}
</style>

<script>
import ShaderProgram from "@/utils/ShaderProgram";
export default {
  props: {
    count: {
      type: Number,
      default: 2000,
    },
    minOpacity: {
      type: Number,
      default: 1,
    },
    depth: {
      type: Number,
      default: 80,
    },
    size: {
      type: Number,
      default: 5,
    },
    windChange: {
      type: Boolean,
      default: true,
    },
    gravity: {
      type: Number,
      default: 50,
    },
    wind: {
      type: Object,
      default: () => ({
        current: 0,
        force: 0.1,
        target: 0.05,
        min: 0.05,
        max: 0.25,
        easing: 0.005,
      }),
    },
  },
  data: function () {
    return {
      snow: null,
    };
  },
  mounted() {
    const snowflake = require(`~/assets/img/banner/el-tree.svg`);
    const {
      count,
      windChange,
      minOpacity,
      depth,
      size: particleSize,
      gravity,
    } = this;
    let wind = {
      current: 0,
      force: 0.1,
      target: 0.05,
      min: 0.05,
      max: 0.25,
      easing: 0.005,
      ...this.wind,
    };
    this.snow = new ShaderProgram(this.$refs.holder, this.$refs.canvas, {
      mousemove: false,
      mouseclick: false,
      depthTest: true,
      antialias: true,
      texture: snowflake,
      uniforms: {
        worldSize: { type: "vec3", value: [0, 0, 0] },
        gravity: { type: "float", value: gravity },
        wind: { type: "float", value: 0 },
      },
      buffers: {
        size: { size: 1, data: [] },
        rotation: { size: 3, data: [] },
        speed: { size: 3, data: [] },
      },
      vertex: `
    precision highp float;

    attribute vec4 a_position;
    attribute vec4 a_color;
    attribute vec3 a_rotation;
    attribute vec3 a_speed;
    attribute float a_size;

    uniform float u_time;
    uniform vec3 u_mousemove;
    uniform vec2 u_resolution;
    uniform mat4 u_projection;
    uniform vec3 u_worldSize;
    uniform float u_gravity;
    uniform float u_wind;

    varying vec4 v_color;
    varying float v_rotation;
    float is_inside(vec2 xy, float radius) {
      return step(length(xy), radius);
    }
    void main() {

      v_color = a_color;
      v_rotation = a_rotation.x + u_time * a_rotation.y;
      vec3 pos = a_position.xyz;
      pos.x = mod(pos.x + u_time + u_wind * a_speed.x, u_worldSize.x * 2.0) - u_worldSize.x;
      pos.y = mod(pos.y - u_time * a_speed.y * u_gravity, u_worldSize.y * 2.0) - u_worldSize.y;

      pos.x += sin(u_time * a_speed.z) * a_rotation.z;
      pos.z += cos(u_time * a_speed.z) * a_rotation.z;
      gl_Position = u_projection * vec4( pos.xyz, a_position.w );
      gl_PointSize = ( a_size / gl_Position.w ) * 100.0;

    }`,
      fragment: `
    precision highp float;
    uniform sampler2D u_texture;

    varying vec4 v_color;
    varying float v_rotation;

    void main() {

      vec2 rotated = vec2(
        cos(v_rotation) * (gl_PointCoord.x - 0.5) + sin(v_rotation) * (gl_PointCoord.y - 0.5) + 0.5,
        cos(v_rotation) * (gl_PointCoord.y - 0.5) - sin(v_rotation) * (gl_PointCoord.x - 0.5) + 0.5
      );

      vec4 snowflake = texture2D(u_texture, rotated);

      gl_FragColor = vec4(snowflake.rgb, snowflake.a * v_color.a);

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

        Array.from({ length: (w / h) * count }, () => {
          position.push(
            -width + Math.random() * width * 2,
            -height + Math.random() * height * 2,
            Math.random() * depth * 2
          );

          speed.push(
            // 0, 0, 0 )
            1 + Math.random(),
            1 + Math.random(),
            Math.random() * 10
          ); // x, y, sinusoid

          rotation.push(
            Math.random() * 2 * Math.PI,
            Math.random() * 20,
            Math.random() * 10
          ); // angle, speed, sinusoid

          color.push(1, 1, 1, minOpacity + Math.random() * (1 - minOpacity));

          size.push(5 * Math.random() * particleSize * ((h * dpi) / 1000));
        });

        this.uniforms.worldSize = [width, height, depth];

        this.buffers.position = position;
        this.buffers.color = color;
        this.buffers.rotation = rotation;
        this.buffers.size = size;
        this.buffers.speed = speed;
      },
      onUpdate(delta) {
        wind.force += (wind.target - wind.force) * wind.easing;
        wind.current += wind.force * (delta * 0.2);
        this.uniforms.wind = wind.current;
        //changing direction
        if (Math.random() > 0.995) {
          wind.target =
            (wind.min + Math.random() * (wind.max - wind.min)) *
            (Math.random() > 0.5 && windChange ? -1 : 1);
        }

        // stats.update()
      },
    });
  },
};
</script>
