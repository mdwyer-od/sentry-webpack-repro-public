export default {
  ssr: false,
  target: 'static',
  head: {
    title: 'sentry-webpack-repro-public',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  styleResources: {
    scss: [
      '~/assets/styles/_variables.scss'
    ]
  },
  buildModules: [
    [
      '@nuxt/typescript-build', {
        typeCheck: {
          typescript: {
            configFile: 'tsconfig.build.json'
          }
        }
      }
    ]
  ],
  modules: [
    '@nuxtjs/sentry'
  ],
  sentry: {
    dsn: "<dsn>",
    disabled: false,
    config: {
      environment: 'prod',
      release: process.env.npm_package_version,
      autoSessionTracking: false,
      debug: true,
      attachStacktrace: true
    },
    publishRelease: {
      authToken: process.env.SENTRY_AUTH_TOKEN,
      url: '<url>',
      org: '<org>',
      project: '<project>',
      debug: true,
      sourcemaps: {
        assets: [`./dist/**/*`],
        ignore: ['./node_modules/**']
      }
    }
  },
  build: {
    loaders: {
      scss: {
        additionalData: '@use "~/assets/styles/_variables.scss"',
        sourceMap: false
      }
    },
    postcss: {
      preset: {
        autoprefixer: {
          remove: false
        }
      }
    },
    postcss: false,
    terser: {
      terserOptions: {
        compress: {
          pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
        }
      }
    },
  },
  generate: {
    exclude: [/\/.+/]
  }
}
