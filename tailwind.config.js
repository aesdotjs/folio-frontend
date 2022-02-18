const plugin = require("tailwindcss/plugin");
module.exports = {
  theme: {
    fontFamily: {
      georama: ["Georama"],
    },
    extend: {
      colors: {
        bred: {
          DEFAULT: "#721626",
        },
        bwhite: {
          DEFAULT: "#FFEBE3",
        },
        bgray: {
          DEFAULT: "#5b5b5b",
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
