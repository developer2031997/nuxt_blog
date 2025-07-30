// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  // ✅ Enable document-driven mode for Nuxt Content (optional, helps with structure)
  content: {
    documentDriven: true,
  },

  // ✅ Ensure static generation works properly
  nitro: {
    prerender: {
      crawlLinks: true, // ✅ Will follow <a> links to pre-render more pages
      routes: [
        "/", // home
        "/posts", // posts list
        // You can add static routes here if needed
      ],
      failOnError: false,
    },
    preset: "node",
  },
  // ✅ Required for static content to build correctly
  // generate: {
  //   fallback: true, // fallback for 404
  // },

  devtools: { enabled: false },

  css: ["@/assets/css/tailwind.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  build: {
    transpile: [],
  },

  modules: [
    "@nuxt/content",
    "@nuxtjs/google-fonts",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@vite-pwa/nuxt",
  ],

  components: true,

  googleFonts: {
    families: {
      Poppins: [300, 400, 500, 600, 700],
    },
  },

  plugins: [],

  // ✅ PWA Support
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "My Nuxt Blog",
      short_name: "Blog",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#00DC82",
      icons: [
        {
          src: "https://thumbs.dreamstime.com/b/creative-simple-dragons-silhouettes-logo-stylized-vector-illustrations-simple-dragons-silhouettes-logo-130475058.jpg",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "https://thumbs.dreamstime.com/b/creative-simple-dragons-silhouettes-logo-stylized-vector-illustrations-simple-dragons-silhouettes-logo-130475058.jpg",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
  },
});
