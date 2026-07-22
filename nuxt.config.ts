export default defineNuxtConfig({
  compatibilityDate: '2025-04-01',

  future: {
    compatibilityVersion: 4,
  },

  srcDir: 'app/',

  nitro: {
    preset: 'cloudflare-pages',
  },

  runtimeConfig: {
    turnstile: {
      secretKey: '',
    },
    public: {
      turnstile: {
        siteKey: '',
      },
    },
  },

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@nuxtjs/i18n',
    '@vite-pwa/nuxt',
  ],

  pwa: {
    registerType: 'autoUpdate',
    includeAssets: ['favicon.webp', 'loader.webp'],
    manifest: {
      name: 'Burhan',
      short_name: 'Burhan',
      description: '思想回应与学术对话平台',
      theme_color: '#0a0a0a',
      background_color: '#0a0a0a',
      display: 'standalone',
      orientation: 'any',
      lang: 'zh',
      dir: 'ltr',
      icons: [
        { src: 'pwa/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: 'pwa/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: 'pwa/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,webp,png,svg,woff2}'],
      navigateFallback: null,
    },
  },

  components: [
    { path: '~/components/ui', pathPrefix: false },
    { path: '~/components/hub', pathPrefix: false },
    { path: '~/components/tenant', pathPrefix: false },
    { path: '~/components/premium', pathPrefix: false },
    { path: '~/components/dashboard', pathPrefix: false },
    '~/components',
  ],

  tailwindcss: {
    configPath: './tailwind.config.ts',
    cssPath: './app/assets/css/main.css',
    viewer: false,
    exposeConfig: false,
  },

  supabase: {
    // v2: secretKey replaces deprecated serviceKey; maps project env at build time
    secretKey: process.env.SUPABASE_SECRET_KEY,
    redirect: false,
    types: '~/types/database.ts',
    // useSsrCookies defaults to true — drop clientOptions.auth that conflict with SSR cookies
  },

  i18n: {
    // v10: restructureDir cannot be false; use app/ so existing i18n.config.ts resolves
    restructureDir: 'app',
    locales: [
      { code: 'zh', iso: 'zh-CN', dir: 'ltr' },
      { code: 'en', iso: 'en-US', dir: 'ltr' },
    ],
    defaultLocale: 'zh',
    strategy: 'prefix_except_default',
    vueI18n: 'i18n.config.ts',
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ],
    },
  },

  app: {
    pageTransition: {
      name: 'fade',
      mode: 'out-in',
    },
  },
})
