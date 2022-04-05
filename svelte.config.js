const sveltePreprocess = require('svelte-preprocess');
const autoprefixer = require('autoprefixer');

module.exports = {
  preprocess: sveltePreprocess({
    scss: {
      prependData: '@import "./src/renderer/_vars.scss";'
    },
    postcss: {
      plugins: [autoprefixer()]
    }
  }),
};
