// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
  css: [
    // '~~/layout/main.css',
    "@/assets/css/tailwind.css",
  ],
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
    // display: 'swap', // Optional: ensures text remains visible during webfont load
  },
  content: {},
  plugins: [],

  // ✅ PWA Config
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
