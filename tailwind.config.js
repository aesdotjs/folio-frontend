const plugin = require("tailwindcss/plugin");
module.exports = {
  theme: {
    fontFamily: {
      georama: ["Georama"],
    },
    extend: {
      colors: {
        aeswhite: {
          DEFAULT: "#f3e9ec",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("above-viewport", "&.above-viewport:not(.in-viewport)");
      addVariant("below-viewport", "&.below-viewport:not(.in-viewport)");
      addVariant("in-viewport", "&.in-viewport");
      addVariant("in-viewport-child", ".in-viewport &");
    }),
  ],
};
