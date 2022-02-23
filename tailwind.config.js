const plugin = require("tailwindcss/plugin");
module.exports = {
  theme: {
    fontFamily: {
      georama: ["Georama"],
    },
    extend: {
      colors: {
        aeswhite: "#FFF8F5",
        aesgray: "#f3e9ec",
        aesblue: "#200E4F",
        aespurple1: "#500366",
        aespurple2: "#820066",
        aesorange:  "#DC3C00",
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
    function({ addBase, theme }) {
      function extractColorVars(colorObj, colorGroup = '') {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];

          const newVars =
            typeof value === 'string'
              ? { [`--color${colorGroup}-${colorKey}`]: value }
              : extractColorVars(value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      }

      addBase({
        ':root': extractColorVars(theme('colors')),
      });
    },
  ],
};
