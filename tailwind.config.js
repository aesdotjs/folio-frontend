const plugin = require("tailwindcss/plugin");
module.exports = {
  theme: {
    fontFamily: {
      georama: ["Georama"],
      mono: ["monoVT"],
      retro: ["retro"],
    },
    extend: {
      colors: {
        aeswhite: "#f8f6ff",
        aesgray: "#C8B5B7",
        aesblue: "#200E4F",
        aespurple1: "#500366",
        aespurple2: "#820066",
        // aesorange:  "#DC3C00",
        aesorange:  "#ff5e21",
      },
    },
  },
  safelist: ["bg-black", "text-red-600", "border-red-600"],
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("inview", "&.is-inview");
      addVariant("inview-child", ".is-inview &");
      addVariant("sw-active", ".swiper-slide-active .is-inview &");
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
