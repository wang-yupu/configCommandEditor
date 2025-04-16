// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['./style.css'],

  vite: {
      worker: {
          format: 'es',
      },
  },

  modules: ['nuxt-monaco-editor'],
});