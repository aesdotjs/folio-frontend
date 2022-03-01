const plugin = require("tailwindcss/plugin");
module.exports = {
  theme: {
    fontFamily: {
      georama: ["Georama"],
    },
    extend: {
      colors: {
        aeswhite: "#FFE3D8",
        aesgray: "#C8B5B7",
        aesblue: "#200E4F",
        aespurple1: "#500366",
        aespurple2: "#820066",
        aesorange:  "#DC3C00",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("inview", "&.is-inview");
      addVariant("inview-child", ".is-inview &");
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
