// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  server: {
    port: 3001,
  },
  ssr: false,
  runtimeConfig: {
    public:{
      baseURL: process.env.APP_API_URL,
      API_URL: process.env.APP_API_URL+'api/v1/',
      APP_URL: process.env.APP_URL,
    },
  },
    typescript: false,
    app: {
        head: {
            titleTemplate: '%s - Flyer Builder',
            title: '  Flyer Builder',
            link: [
                {
                    id: 'theme-css',
                    rel: 'stylesheet',
                    type: 'text/css',
                    href: '/themes/lara-light-teal/theme.css'
                }
            ], 
        },
        pageTransition: {
          name: 'fade',
          mode: 'out-in' // default
        },
        layoutTransition: {
          name: 'slide',
          mode: 'out-in' // default
        }
    },
    plugins: [
      { src: "~/plugins/jquery", mode: "client" },
    ],
    router: {
        base: '/dashboard',
      },
    modules: ['@pinia-plugin-persistedstate/nuxt','nuxt-primevue', '@nuxtjs/google-fonts', 'nuxt-typed-router', '@vee-validate/nuxt', [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ]],
    pinia: {
      autoImports: ['defineStore', 'definePiniaStore','usePinia','storeToRefs'],
    },
    imports: {
      dirs: ['./stores'],
    },
    nitro:{
      dirs: ['./server/utils','./stores/common.js'],
    },
    googleFonts: {
        subsets: 'latin',
        display: 'auto', // 'auto' | 'block' | 'swap' | 'fallback' | 'optional'
        families: {
          Poppins: {
            wght: [400, 900], 
          },
          'poppins': true,
        }
      },
    primevue: {
        options: { ripple: true },
        components: {
            exclude: ['Editor']
        }
    },
    css: [
      'primeicons/primeicons.css', 'primeflex/primeflex.scss', 'primevue/resources/primevue.min.css', '@/assets/styles.scss', '@/assets/custom.css',
    ],  
});