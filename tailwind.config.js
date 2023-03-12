/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/tbb-ui/src/components/**/*.vue",
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [],
};
