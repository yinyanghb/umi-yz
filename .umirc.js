
// ref: https://umijs.org/config/
import { resolve } from 'path'
import { i18n } from './src/utils/config'
export default {
  ignoreMomentLocale: true,
  targets: { ie: 9 },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: { immer: true },
      dynamicImport: {
        webpackChunkName: true,
        loadingComponent: './components/Loader/Loader',
      },
      title: 'yy',
      dll: true,
      routes: {
        exclude: [
          /model\.(j|t)sx?$/,
          /service\.(j|t)sx?$/,
          /models\//,
          /components\//,
          /services\//,
        ],
        update:routes=>{
          if (!i18n) return routes
          const newRoutes = []
          for(const item of routes[0].routes){
            newRoutes.push(item)
            if (item.path) {
              newRoutes.push(
                Object.assign({}, item, {
                  path:
                    `/:lang(${i18n.languages
                      .map(item => item.key)
                      .join('|')})` + item.path,
                })
              )
            }
          }
          routes[0].routes = newRoutes
          return routes
        },
      },
      hardSource: true,
      // fastClick:true
    }],
  ],
  alias: {
    api: resolve(__dirname, './src/services/'),
    components: resolve(__dirname, './src/components'),
    config: resolve(__dirname, './src/utils/config'),
    models: resolve(__dirname, './src/models'),
    routes: resolve(__dirname, './src/routes'),
    services: resolve(__dirname, './src/services'),
    themes: resolve(__dirname, './src/themes'),
    utils: resolve(__dirname, './src/utils'),
    sidenav:resolve(__dirname, './src/assets/images/sidenav'),
  },
  extraBabelPresets: ['@lingui/babel-preset-react'],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'lodash',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'lodash',
    ],
  ],
}
