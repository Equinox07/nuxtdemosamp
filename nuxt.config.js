
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href:'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css' },
      { rel: 'stylesheet', href:'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' }
    ],
    scripts: [
        {
          src: '"https://code.jquery.com/jquery-3.5.1.slim.min.js',
          type: 'text/javascript'
        },
        {
          src: 'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js',
          type: 'text/javascript'
        },
        {
          src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js',
          type: 'text/javascript'
        }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],



  router: {
    middleware: ["clearValidationErrors"]
  },

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

    /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
 plugins: [
  '~/plugins/mixins/user.js',
  './plugins/mixins/validation.js',
  '~/plugins/axios.js'
],


  auth: {
    strategies: {
      local: {
       endpoints:{
        login: {
            url: 'login',
            method: 'post',
            propertyName: 'meta.token'
          },
          user: {
            url: 'me',
            method: 'post',
            propertyName: 'data'
          },
          logout: {
            url: 'logout',
            method: 'post',
          }
        }
      }
    }
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    // baseUrl: 'localhost/backend/public/api'
    baseURL: 'http://127.0.0.1:8000/api'
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    transpile: ['@nuxtjs/auth']
  }
}
