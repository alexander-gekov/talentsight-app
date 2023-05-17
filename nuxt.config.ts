// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxthq/ui", "@sidebase/nuxt-auth", "@nuxtjs/supabase"],
  auth: {
    globalAppMiddleware: false,
  },
});
